// api/db.js

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // caminho para o seu arquivo JSON
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = (req, res) => {
  server(req, res);
};
