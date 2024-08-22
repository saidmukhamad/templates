import { NextFunction, static as static_, json, Request, Express, Response } from "express";
import cors from "cors";

export const middewares = (app: Express) => {
  app.use(static_("public"));
  app.get("/", (req, res) => res.send("<h1>Works</h1>"));
  app.use(json());
  app.use(cors({ origin: ["http://localhost:5173", "http://95.140.159.95:5173"], credentials: true }));

  app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);
    res.status(201).json({
      ok: true,
      error: "Yes but unexpected",
    });
  });
};
