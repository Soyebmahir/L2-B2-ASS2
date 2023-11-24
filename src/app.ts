import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/config/modules/users/user.routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment@2 server is running');
});
export default app;
