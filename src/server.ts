import express, { Request, Response, NextFunction } from 'express';
import http from "http";
import bodyParser from "body-parser";
import cors from "cors"; 
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { routes } from "./api";
import { prisma } from "./external/database";
import request from 'supertest';
import helmet from "helmet";
import crypto from 'crypto';

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.nonce = crypto.randomBytes(16).toString('hex');
    next();
  });

app.use(
    helmet.contentSecurityPolicy({
    directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", (req: any, res: any) => `'nonce-${res.locals.nonce}'`],
    styleSrc: ["'self'", 'https://fonts.googleapis.com', (req: any, res: any) => `'nonce-${res.locals.nonce}'`],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    imgSrc: ["'self'"],
    connectSrc: ["'self'"],
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
    action: "deny",
    },
})
);

app.use(cors({
    origin: process.env.ORIGINS
}));

app.disable('x-powered-by');

new routes(app, prisma);

const server = http.createServer(app);

server.listen(process.env.PORT || 3001, () => {
    console.log(`RUNNING ON PORT ${process.env.PORT || 3001}`);
});


export default request(server);