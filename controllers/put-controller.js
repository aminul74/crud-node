const {findPutUser} = require('../methods/putUser')

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

async function putUser(req, res) {
  try {
    const incomingUrl = req.url.split("/");
    const id = incomingUrl[incomingUrl.length - 1];
    const body = await getBody(req,id);
  
    const parseBody = JSON.parse(body);
    const modifiedData = await findPutUser(parseBody);

    res.statusCode = 201;
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(modifiedData));
  } catch (error) {
    res.end(JSON.stringify({ message: "Unable to change" }));
  }
}

module.exports = {
  putUser,
};
