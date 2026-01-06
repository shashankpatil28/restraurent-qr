import { Router } from 'express';
import * as menuController from './menu.controller';

export const menuRoutes = Router();

/* Public (Customer) */
menuRoutes.get('/public', menuController.getPublicMenu);

/* Admin (Auth middleware later) */
menuRoutes.post('/category', menuController.createCategory);
menuRoutes.post('/item', menuController.createMenuItem);
menuRoutes.patch('/item/:id', menuController.updateMenuItem);
menuRoutes.delete('/item/:id', menuController.deleteMenuItem);
