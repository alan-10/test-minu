import "express-async-errors"
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { ErrorHandler  } from "./infra/errors/ErrorHandler";
import { connectToDatabase } from '../database'
import cors from 'cors';
import { routes } from './infra/http/routes'



const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
connectToDatabase()

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

  if (error instanceof ErrorHandler) {
    res.status(error.statusCode).json({
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  console.log("Error:" , error.stack);

  res.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
  });
});


const PORT = 8001;
app.listen(PORT, () => {
  console.log("server started on port ", PORT);
})