import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import productRouter from "./routes/product"

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);

const port = process.env.PORT;

app.post("/", (req: Request, res: Response) => {
  console.log(req.body)
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


