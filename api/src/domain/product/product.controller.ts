import { Request, Response } from 'express'

import { ProductService } from './product.service'
import { userSchemaValidation, userSchemaValidationUpdate } from './model/product.model';
export class ProductController {

  constructor(private productService: ProductService) { }

  public async create(request: Request, response: Response) {

    const product = request.body;

    const { error } = userSchemaValidation.validate(product);

    if (error) {
      response.status(400).json({ error: error.details[0].message });
      return ;
    }

    const productCreated = await this.productService.createProduct(product);

    response.status(201).json({ product: productCreated })
  }

  public async findAll(request: Request, response: Response) {
    const products = await this.productService.findAll();

    response.status(200).json({ products: products })
  }


  public async update(request: Request, response: Response) {

    const productId = request.params.id;

    const productData = request.body

    const { error } = userSchemaValidationUpdate.validate(productData);

    if (error) {
      response.status(400).json({ error: error.details[0].message });
      return ;
    }

    const product = await this.productService.update(productId, productData);

    response.status(200).json({ product: product });
  }


  public async findById(request: Request, response: Response) {
    const productId = request.params.id

    const products = await this.productService.findById(productId);

    response.status(200).json({ product: products });
  }

  public async delete(request: Request, response: Response) {
    const productId = request.params.id

    this.productService.delete(productId);

    response.status(200).end()
  }


}