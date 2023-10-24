const express = require("express");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage()
}).array("images", 12);

const fireStore = require("./firestore/");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.post("/images", upload, async (req, res) => {
  const downloadURL = await fireStore.uploadFile(req.files);
  return res.send(downloadURL);
});

app.delete("/images/", (req, res) => {
  const { file_reference } = req.body;
  fireStore.deleteFile(file_reference);
  return res.send("File Deleted");
});

app.listen(3001, () => {
  console.log("App listen on port 3001");
});
