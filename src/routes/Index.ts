import { Router } from 'express';
import { HttpStatus } from '@enumerators/HttpStatus';
import UserRoute from '@routes/UserRoute'

const router = Router();

router.use("/user", UserRoute);