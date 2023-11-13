// const usersData = require('../data/users.json');
const fs = require("node:fs");

function findAllUsers() {
  const promiseData = new Promise((resolve, reject) => {
    fs.readFile("./data/users.json", "utf8", (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
  return promiseData;
}

function findUserById(id) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile("./data/users.json", "utf8", (error, data) => {
      if (error) {
        reject("Unable to process request");
      }
      const transform = JSON.parse(data);
      const user = transform.find((value, index) => {
        return value.id === parseInt(id);
      });
      if (!user) {
        reject("user invalid");
      };
      resolve(user);
    });
  });
  return promise;
}

module.exports = {
  findAllUsers,
  findUserById,
};
