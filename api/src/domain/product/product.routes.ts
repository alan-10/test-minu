import { Router} from 'express';

const productRoutes =  Router();

import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { authozitation } from '../auth/authorization';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository)
const productController =  new ProductController(productService);

productRoutes.use(authozitation);

productRoutes.post('/product',productController.create.bind(productController));
productRoutes.get('/product/all',productController.findAll.bind(productController));
productRoutes.get('/product/:id',productController.findById.bind(productController));
productRoutes.delete('/product/:id',productController.delete.bind(productController));
productRoutes.patch('/product/:id',productController.update.bind(productController));

export { productRoutes }