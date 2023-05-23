const express = require("express");
const multer = require("multer");
const PDFJS = require("pdfjs-dist/legacy/build/pdf");

const app = express();
const upload = multer({ dest: "uploads/" });

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("pdf"), (req, res) => {
  const { path } = req.file;

  PDFJS.getDocument(path)
    .promise.then((doc) => {
      let extractedText = "";

      for (let i = 1; i <= doc.numPages; i++) {
        doc
          .getPage(i)
          .then((page) => page.getTextContent())
          .then((textContent) => {
            console.log("Extracted Text: ", textContent);
            extractedText += textContent.items.map((item) => item.str).join(" ");
            if (i === doc.numPages) {
              res.send(extractedText);
            }
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while processing the PDF.");
    });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
