import express from 'express';
import cors from 'cors';
import SwimmersRoutes from './routes/swimmers.routes';
import AccesoriesRoutes from './routes/accesories.routes';  
import CompetitionsRoutes from './routes/competitions.routes';
import AuthRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware.ts';
 
const app = express();
 
app.use(cors());
 
app.use(express.json());
 
app.get('/api/v1/health', (req, res) => {
 
  res.json({
    status: 'OK'
  });
 
});
 
app.use(
  '/api/v1/swimmers',
  SwimmersRoutes
);

app.use(
  '/api/v1/accessories',
  AccesoriesRoutes
);

app.use(
  '/api/v1/competitions',
  CompetitionsRoutes
);

app.use(
  '/api/v1/auth',
  AuthRoutes
);

app.use(errorHandler);
 
export default app;