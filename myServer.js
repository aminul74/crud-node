const http = require("node:http");
const { getAllUsers, getUserById } = require("./controllers/usersController");
const { createUser } = require("./controllers/post-controller");
const { putUser } = require("./controllers/put-controller");

const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // console.log("test");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Home Page" }));
  } else if (req.url === "/api/users" && req.method === "GET") {
    // console.log("2nd");
    getAllUsers(req, res);
  } else if (req.url.includes("/api/users") && req.method === "GET") {
    getUserById(req, res);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (req.url.includes("/api/users") && req.method === "PUT") {
    putUser(req, res);
  } else {
    console.log("3rd");
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: "Page Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server Listening On Port : ${PORT} `);
});
