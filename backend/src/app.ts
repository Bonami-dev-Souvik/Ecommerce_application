import express from 'express';
import authenticateToken from './middlewares/protectedRoute'
import signUpRoute from './routes/signUpRoute';
import loginRoute from './routes/loginRoute';
import productRoute from './routes/productsRoute';
import seedRouter from './routes/seedRoute';
import orderRouter from './routes/orderRoute';
import myOrdersRoute from './routes/myOrdersRoute';
import productDetailsRouter from './routes/productDetailsRoute';
import searchRoute from './routes/searchRoute';
import cartRoute from './routes/cartRoute';
import addressRoute from './routes/addressRoute';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';



const app = express();
dotenv.config();
const PORT = process.env.PORT;



app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());


app.use('/ecommerce_application', signUpRoute);
app.use('/ecommerce_application', loginRoute);


app.get('/ecommerce_application/auth-check', authenticateToken, (req, res) => {

  res.status(200).json({ user: req.user });
});

app.use('/ecommerce_application', authenticateToken );
app.use('/ecommerce_application', productRoute);
app.use('/ecommerce_application', productDetailsRouter);
app.use('/ecommerce_application', seedRouter);
app.use('/ecommerce_application', cartRoute);
app.use('/ecommerce_application', orderRouter);
app.use('/ecommerce_application', myOrdersRoute);
app.use('/ecommerce_application', searchRoute);
app.use('/ecommerce_application', addressRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
