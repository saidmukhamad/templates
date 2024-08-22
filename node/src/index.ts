// import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import { middewares } from "./middleware";

dotenv.config();

const PORT = process.env.PORT ?? 3002;

// const prisma = new PrismaClient();

const app = express();
middewares(app);

app.listen(PORT, () => console.log("app started"));
