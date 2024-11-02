import { CreateProductDTO } from './dtos/create-product.dto';
import ProductModel, { IProduct } from './model/product.model';

export class ProductRepository {

  public async createProduct(userData: CreateProductDTO): Promise<IProduct> {
    const user = new ProductModel(userData);
    return await user.save();
  };

  public async getProductById(id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id);
  };

  public async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
  };

  public async deleteProduct(userId: string): Promise<IProduct | null> {
    return await ProductModel.findByIdAndDelete(userId);
  };


  public async getAllProduct() {
    return await ProductModel.find()
   }


}