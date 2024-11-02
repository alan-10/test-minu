import { Router } from 'express';
import { userRoutes } from '../../domain/user/user.routes';
import { productRoutes } from '../../domain/product/product.routes';


const routes =  Router();

routes.use(userRoutes);
routes.use(productRoutes);


export { routes}