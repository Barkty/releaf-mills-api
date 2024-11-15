import express from "express"
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../swagger.json"
import dumpsiteRouter from "../../modules/dumpsites/routes";

const appRouter = express.Router();

appRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
appRouter.use('/dumpsites', dumpsiteRouter)

export const Router = appRouter;