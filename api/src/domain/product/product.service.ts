import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ProductRepository } from './product.repository';


export class ProductService {

  constructor(private productRepository: ProductRepository) { }

  public async createProduct(userData: CreateProductDTO) {

    return await this.productRepository.createProduct(userData);
  }

  public async findAll(){
    return await this.productRepository.getAllProduct();
  }

  public async findById(id: string){
    return await this.productRepository.getProductById(id);
  }

  public async delete(id: string){
    return await this.productRepository.deleteProduct(id);
  }

  public async update(id:string, productData: UpdateProductDTO){
    return await this.productRepository.updateProduct(id, productData);
  }

}