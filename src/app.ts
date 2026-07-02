import express, { Request, Response, Application } from 'express';
import { ErrorHandlingMiddleware, notFoundMiddlware } from './middlewares/err.middleware';
const app: Application = express();
const PORT: number = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response) => {
    res.send('Chào mừng đến với Express + TypeScript!');
});

app.use(notFoundMiddlware);
app.use(ErrorHandlingMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});