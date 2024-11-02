import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { api } from '../api';
import { toast } from 'react-toastify';


interface UpdateProductsProps {
  id: string;
  name: string;
  description: string
  price: number
  quantity: number
}

interface FormDialogCreateProductProps {
  handleClickOpenProductModal(): void
  handleCloseCreateProductModal(): void
  isOpened: boolean;
  loadPage(): void;
  userData: UpdateProductsProps
}

interface saveProductPros {
  id? :string
  name: string;
  description: string
  price: number
  quantity: number;
}

async function saveProduct(dataProduct: saveProductPros) {
  await api.patch(`/product/${dataProduct.id}`,dataProduct );
}

export function FormDialogUpdateProduct({
  handleCloseCreateProductModal,
  isOpened,
  loadPage,
  userData
}: FormDialogCreateProductProps) {

  const errorToast = () => toast.error("Erro atualizar Produto!.")

  const [formValues, setFormValues] = React.useState<saveProductPros>({
    name: '',
    description: '',
    price: 0,
    quantity: 0
  });

  React.useEffect(() => {
   
    setFormValues({
      id: userData.id,
      name: userData.name || '',
      description: userData.description || '',
      price: userData.price || 0,
      quantity: userData.quantity || 0,
    });
  }, [userData]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

 

  return (
    <React.Fragment>
      <Dialog
        open={isOpened}
        onClose={handleCloseCreateProductModal}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            saveProduct(formValues).then(() => {
              handleCloseCreateProductModal()
              loadPage()
            }).catch(() => {
              errorToast()
            })

          },
        }}
      >
        <DialogTitle>Atualizar produto</DialogTitle>
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
            value={formValues.name}
            onChange={handleInputChange}

          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Descrição"
            fullWidth
            variant="standard"
            value={formValues.description}
            onChange={handleInputChange}
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
            value={formValues.price}
            onChange={handleInputChange}
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
            value={formValues.quantity}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleCloseCreateProductModal}>Cancelar</Button>
          <Button type="submit">Atualizar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
