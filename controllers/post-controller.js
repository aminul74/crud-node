const postUserAll = require("../methods/postUser");
const { newUserPush } = postUserAll;

function getBody(request) {
  return new Promise((resolve) => {
    const bodyParts = [];
    let body;
    request
      .on("data", (chunk) => {
        bodyParts.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(bodyParts).toString();
        resolve(body);
      });
  });
}
async function createUser(req, res) {
  try {
  
    const body = await getBody(req);
    const parseBody = JSON.parse(body);
    const newDataArray = await newUserPush(
      parseBody.id,
      parseBody.name,
      parseBody.age,
      parseBody.description
    );

    res.statusCode = 201;
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newDataArray));
  } catch (error) {
    res.end(JSON.stringify({ message: "Unable to create user" }));
  }
}

module.exports = {
  createUser,
};
