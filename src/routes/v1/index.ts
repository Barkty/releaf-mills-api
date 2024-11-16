import express from "express"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json"
import dumpsiteRouter from "../../modules/dumpsites/routes";
import millsRouter from "../../modules/mills/routes";

const appRouter = express.Router();

appRouter.get('/health', (_req, res) => {res.json({ message: 'Okay' })});
appRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
appRouter.use('/dumpsites', dumpsiteRouter)
appRouter.use('/mills', millsRouter)

export const Router = appRouter;