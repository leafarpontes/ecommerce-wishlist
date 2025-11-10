const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  const data = JSON.parse(fs.readFileSync("mock-products.json", "utf8"));
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));