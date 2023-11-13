const getUser = require("../methods/getUsers");


const { findAllUsers, findUserById } = getUser;

async function getAllUsers(req, res) {
  try {
    const data = await findAllUsers();
    console.log("test1: ", data);
    res.statusCode = 200;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end("Error found");
  }
}

async function getUserById(req, res) {
  try {
    const incomingURl = req.url.split("/");
    const id = incomingURl[incomingURl.length - 1];
    const userId = await findUserById(id);
    res.statusCode = 200;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(userId));
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    res.writeHead(400, { "Content-Type": "application/json" });

    let message = ""
    if(typeof error == "string"){
      message = error;
    } else

    res.end(JSON.stringify({message:error}));
  }
}


module.exports = {
  getAllUsers,
  getUserById,
};
