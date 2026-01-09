const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = 'password123';

  console.log('Start seeding ...');

  // Hash the default password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Use upsert to create the admin user only if it doesn't exist.
  const admin = await prisma.user.upsert({
    where: { email: email },
    update: {}, // No updates needed if the user already exists.
    create: {
      email: email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Admin user created/verified: ${admin.email}`);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });