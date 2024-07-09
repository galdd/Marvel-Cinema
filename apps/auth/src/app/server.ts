import db from './config/sequelize';
import express from 'express';
import adminRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import morgan from 'morgan';
import 'dotenv/config';
import session from 'cookie-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';

db.sync().then(() => {
  console.log("Connected to the database");
});

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    keys: [
      process.env.ACCESS_TOKEN_SECRET as string,
      process.env.REFRESH_TOKEN_SECRET as string,
    ],
    httpOnly: false,
    secure: false,
    maxAge: 300000,
  }),
);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', adminRouter);

export default app;