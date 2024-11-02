
import { ProductService } from '../product.service';
import { ProductRepository } from '../product.repository';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    // Mock do ProductRepository
    productRepository = {
      createProduct: jest.fn(),
      getAllProduct: jest.fn(),
      getProductById: jest.fn(),
      deleteProduct: jest.fn(),
      updateProduct: jest.fn(),
    } as jest.Mocked<ProductRepository>;

    productService = new ProductService(productRepository);
  });

  it('should create a new product', async () => {
    const productData: CreateProductDTO = { name: 'Produto Teste', price: 100, description: "teste", quantity:  1 };
    const createdProduct = { id: '1', ...productData };

    productRepository.createProduct.mockResolvedValue(createdProduct);

    const result = await productService.createProduct(productData);

    expect(result).toEqual(createdProduct);
    expect(productRepository.createProduct).toHaveBeenCalledWith(productData);
  });

  it('Shoul return all produts', async () => {
    const products = [{ id: '1', name: 'Produto 1', price: 100 }];
    productRepository.getAllProduct.mockResolvedValue(products);

    const result = await productService.findAll();

    expect(result).toEqual(products);
    expect(productRepository.getAllProduct).toHaveBeenCalled();
  });

  it('Shoul return a product by Id', async () => {
    const productId = '1';
    const product = { id: productId, name: 'Produto Teste', price: 100 };
    productRepository.getProductById.mockResolvedValue(product);

    const result = await productService.findById(productId);

    expect(result).toEqual(product);
    expect(productRepository.getProductById).toHaveBeenCalledWith(productId);
  });

  it('Should delete a product by Id', async () => {
    const productId = '1';
    productRepository.deleteProduct.mockResolvedValue(null);

    const result = await productService.delete(productId);

    expect(result).toBeNull();
    expect(productRepository.deleteProduct).toHaveBeenCalledWith(productId);
  });

  it('Should update a product by ID', async () => {
    const productId = '1';
    const updateData: UpdateProductDTO = { name: 'Produto Atualizado', price: 150, description: "description teste", quantity: 10 };
    const updatedProduct = { id: productId, ...updateData };

    productRepository.updateProduct.mockResolvedValue(updatedProduct);

    const result = await productService.update(productId, updateData);

    expect(result).toEqual(updatedProduct);
    expect(productRepository.updateProduct).toHaveBeenCalledWith(productId, updateData);
  });
});
