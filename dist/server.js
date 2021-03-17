"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger_output.json"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const http_1 = __importDefault(require("http"));
require("./database/connection");
const socketIo = require('socket.io');
const app = express_1.default();
const server = http_1.default.createServer(app);
let io = socketIo(server);
io.on("connection", function (socket) {
    console.log("New client connected", socket.id);
    socket.on("universal", function (data) {
        console.log(data);
        io.emit(`status${data.id}`, data.status);
    });
});
app.use((request, response, next) => {
    request.socket = io;
    return next();
});
const port = process.env.PORT || 3333;
app.use(cors_1.default());
app.use(cors_1.default({ origin: true, credentials: true }));
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(routes_1.routes);
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
server.listen(port, () => console.log("server running on port: " + port)); //Porta que a API fica escutando
