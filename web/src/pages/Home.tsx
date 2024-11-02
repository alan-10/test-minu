import { Button } from "@mui/material";
import { MenuAppBar } from "../components/Header";


import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { api } from "../api";
import { FormDialogCreateProduct } from "../components/CreateProductDialog";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormDialogUpdateProduct } from "../components/UpdateProductDialog";

interface Column {
  id: 'name' | 'description' | 'price' | 'quantity' | 'edite' | 'deleteAction';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nome', minWidth: 170 },
  { id: 'description', label: 'Descrição', minWidth: 100 },
  {
    id: 'price',
    label: 'Preço',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Quantidade',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'edite',
    label: 'Editar',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'deleteAction',
    label: 'Deletar',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  name: string;
  description: string;
  price: number;
  quantity: number;
  edite: React.ReactNode;
  deleteAction: React.ReactNode
}

function createData(
  name: string,
  description: string,
  price: number,
  quantity: number,
  edite: React.ReactNode,
  deleteAction: React.ReactNode,
): Data {
  return { name, description, price, quantity, edite, deleteAction };
}

interface UpdateProductsProps {
  id: string;
  name: string;
  description: string
  price: number
  quantity: number
}

export function Home() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = React.useState([]);
  const [loadingPage, setLoadingPage] = React.useState(true);

  const [openModalCreateProduct, setOpenModalCreateProduct] = React.useState(false);
  const [openModalUpdateProduct, setOpenModalUpdateProduct] = React.useState(false);

  const [dataUpdateProduct, setDataUpdateProduct] = React.useState<UpdateProductsProps>({
    description: "",
    id: "",
    name: "",
    price: 0,
    quantity: 0
  })



  const handleClickOpenProductModal = () => {
    setOpenModalCreateProduct(true);
  };

  const handleCloseCreateProductModal = () => {
    setOpenModalCreateProduct(false)
  };

  const handleClickOpenUpdateProductModal = () => {
    setOpenModalUpdateProduct(true);
  };

  const handleCloseUpdateProductModal = () => {
    setOpenModalUpdateProduct(false)
  };


  

  function updateProduct(data: UpdateProductsProps) {
    setDataUpdateProduct(data)
    handleClickOpenUpdateProductModal()
  }



  function showldLoadPage() {
    setLoadingPage((prevLoadingPage) => !prevLoadingPage);
  }



  React.useEffect(() => {
    api.get('product/all').then(products => {
      setProducts(products.data.products)
    })
  }, [loadingPage])


  async function deleleteProduct(id: { id: string }) {

    await api.delete(`product/${id}`);

    showldLoadPage()
      
  }

  const rows = products?.map((product: any) => {
    return createData(
      product.name,
      product.description,
      product.price,
      product.quantity,
      <EditIcon className="cursor-pointer" onClick={() => updateProduct({
        id: product._id,
        description: product.description,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      })} />,
      <DeleteIcon className="cursor-pointer" onClick={() => deleleteProduct(product._id)} color="error" />
    )
  }) || [];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <div>
      <MenuAppBar />

      < FormDialogCreateProduct
        handleClickOpenProductModal={handleClickOpenProductModal}
        handleCloseCreateProductModal={handleCloseCreateProductModal}
        isOpened={openModalCreateProduct}
        loadPage={showldLoadPage}
      />

      <FormDialogUpdateProduct
        handleClickOpenProductModal={handleClickOpenUpdateProductModal}
        handleCloseCreateProductModal={handleCloseUpdateProductModal}
        isOpened={openModalUpdateProduct}
        loadPage={showldLoadPage}
        userData={dataUpdateProduct}
      />
      <div className="mt-20 w-9/12	  m-auto  ">
        <div className="flex justify-between">
          <p className="text-lg">Produtos</p>
          <Button onClick={() => setOpenModalCreateProduct(true)} variant="contained">Criar produto</Button>
        </div>
        <div className="mt-4">
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  )
}