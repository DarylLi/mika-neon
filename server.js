const Koa = require("koa");
const mime = require("mime-types");
const Router = require("koa-router");
const koaBody = require("koa-body");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const app = new Koa();
const router = new Router();
const qrcode_util = require(".").qrcode;

router.get("/", async (ctx) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <label for="avatar">Choose a project archive:</label><br>
      <input type="file" name="file"
          accept="image/png, image/jpeg"><br>
      <button>Submit</button>
    </form><br/>
    <form action="/qrcode" method="get">
      <button>Generate Qrcode!</button>
    </form>
  </body>
  <script>
    document.getElementById("qrcode").addEventListener('click',)
  </script>
  </html>\n`;
});
router.get(
  "/upload",
  koaBody.koaBody({ multipart: true, uploadDir: "." }),
  async (ctx) => {
    try {
      const { filepath, originalFilename, type } = ctx.request.files.file;
      const reader = fs.createReadStream(filepath);
      //   const type =
      const fileExtension = mime.extension(type);
      console.log(`path: ${originalFilename}`);
      console.log(`filename: ${originalFilename}`);
      console.log(`type: ${type}`);
      console.log(`fileExtension: ${fileExtension}`);

      //   await fs.copy(path, `public/avatars/${name}`);
      const filestream = fs.createWriteStream(`./uploads/${originalFilename}`);
      reader.pipe(filestream);
      ctx.redirect("/");
    } catch (err) {
      console.log(`error ${err.message}`);
      //   await ctx.render("error", { message: err.message });
    }
  }
);
router.get(
  "/qrcode",
  koaBody.koaBody({ multipart: true, uploadDir: "." }),
  async (ctx) => {
    try {
      qrcode_util();
      ctx.redirect("/");
    } catch (err) {
      console.log(`error ${err.message}`);
    }
  }
);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, "0.0.0.0", () =>
    console.log(`listening on http://localhost:${PORT}...`)
  );
