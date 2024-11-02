import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { api } from '../api';
import { toast } from 'react-toastify';


interface FormDialogCreateProductProps {
  handleClickOpenProductModal(): void
  handleCloseCreateProductModal(): void
  isOpened: boolean;
  loadPage(): void;
}

interface saveProductPros {
  name: string;
  description: string
  price: string
  quantity: string
}

async function saveProduct(dataProduct: saveProductPros) {
  await api.post('/product', dataProduct);
}

export function FormDialogCreateProduct({
  handleCloseCreateProductModal,
  isOpened,
  loadPage
}: FormDialogCreateProductProps) {


  const toastErrorCreateProduct = () => toast.error("Erro criar Produto!.")

  return (
    <React.Fragment>
      <Dialog
        open={isOpened}
        onClose={handleCloseCreateProductModal}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const name = formJson.name;
            const description = formJson.description;
            const price = formJson.price;
            const quantity = formJson.quantity;


            saveProduct({
              name,
              description,
              price,
              quantity
            }).then(_ => {
              handleCloseCreateProductModal();
              loadPage()
            }).catch( _ => {
              toastErrorCreateProduct()
            })


          },
        }}
      >
        <DialogTitle>Criar produto</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="name"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descrição"
            // type="desctiption"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Preço"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="quantity"
            name="quantity"
            label="Quantidade"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button  color="error" onClick={handleCloseCreateProductModal}>Cancelar</Button>
          <Button type="submit">Criar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
