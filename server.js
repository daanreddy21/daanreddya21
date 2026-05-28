```js
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

const serveStatic = (request, response) => {
  const { pathname } = new URL(
    request.url,
    `http://${request.headers.host}`
  );

  let requestPath = pathname;

  if (requestPath === "/") {
    requestPath = "/index.html";
  }

  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");

  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    const type =
      mimeTypes[path.extname(filePath)] || "application/octet-stream";

    response.writeHead(200, {
      "Content-Type": type,
    });

    response.end(content);
  });
};

http.createServer(serveStatic).listen(PORT, () => {
  console.log(`Portfolio running on port ${PORT}`);
});
```
