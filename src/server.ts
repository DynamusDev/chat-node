
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

import express, { Request, Response } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes';
import http from "http";
import './database/connection';
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);
let io = socketIo(server);
io.on("connection", function (socket: any) {
  console.log("New client connected", socket.id);
  socket.on("universal", function (data: any) {
    console.log(data)
    io.emit(`status${data.id}`, data.status)
  })
});

app.use((request: Request, response: Response, next) => {
  request.socket = io;
  return next();
})

const port = process.env.PORT || 3333;

app.use(cors());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(routes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
server.listen(port, () => console.log("server running on port: " + port)); //Porta que a API fica escutando