// const {v4: uuidv4} = require('uuid');
const fs = require("fs");

function newUserPush(id, name, age, description) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile("./data/users.json", "utf-8", (error, data) => {
      if (error) {
        reject("Unable to find json data");
      }
      const transform = JSON.parse(data);

      transform.push({
        id: id,
        name: name,
        age: age,
        description: description,
      });

      fs.writeFile(
        "./data/users.json",
        JSON.stringify(transform),
        "utf8",
        (error, written) => {
          if (error) {
            reject("Not create yet!");
          }

          resolve("Sucess!");
        }
      );
    });
  });
  return promise;
}

module.exports = {
  newUserPush,
};
