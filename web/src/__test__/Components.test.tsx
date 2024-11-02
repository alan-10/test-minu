
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from './test-utils'
import { FormDialogCreateProduct } from '../components/CreateProductDialog';
import '@testing-library/jest-dom'
import { api } from '../api/';
import { FormDialogUpdateProduct } from '../components/UpdateProductDialog';


jest.mock('../api');

describe('FormDialogCreateProduct Component', () => {
  const mockHandleClose = jest.fn();
  const mockLoadPage = jest.fn();
  const mockHandleClickOpenProductModal = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dialog with all fields and buttons [FormDialogCreateProduct componet]', async () => {


    render(
      <FormDialogCreateProduct
        handleCloseCreateProductModal={mockHandleClose}
        isOpened={true}
        loadPage={mockLoadPage}
        handleClickOpenProductModal={mockHandleClickOpenProductModal}
      />
    );


    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantidade/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument();

  });


  it('should render the dialog with all fields and buttons [componet: CreateProductDialog]', async () => {


    const productMock = {
      id: "2828",
      name: "teste",
      description: "teste",
      price: 2,
      quantity: 1
    }

    render(
      <FormDialogUpdateProduct
        handleCloseCreateProductModal={mockHandleClose}
        isOpened={true}
        loadPage={mockLoadPage}
        handleClickOpenProductModal={mockHandleClickOpenProductModal}
        userData={productMock}
      />
    );


    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantidade/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /atualizar/i })).toBeInTheDocument();


    fireEvent.click(screen.getByRole('button', { name: /atualizar/i }))

    await waitFor(() => {
      expect(api.patch).toHaveBeenCalled();
      expect(api.patch).toHaveBeenCalledWith('/product/' + productMock.id, productMock);
      expect(mockHandleClose).toHaveBeenCalled();
      expect(mockLoadPage).toHaveBeenCalled();
    });
  });



})