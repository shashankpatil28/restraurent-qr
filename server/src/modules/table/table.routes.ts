import { Router } from 'express';
import * as tableController from './table.controller';

export const tableRoutes = Router();

tableRoutes.post('/', tableController.createTable);
tableRoutes.get('/', tableController.listTables);
tableRoutes.get('/qr/:token', tableController.getTableFromQR);
