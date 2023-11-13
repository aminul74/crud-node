const fs = require("fs");

function findPutUser(parseBody) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile("./data/users.json", "utf8", (error, data) => {
      if (error) {
        reject("invalid json");
      }
      const transform = JSON.parse(data);
      const user = transform.find((value) => {
        return value.id === parseInt(parseBody.id);
      });
      console.log("userrrr", user)
    });
  });
}
module.exports = {
  findPutUser
}