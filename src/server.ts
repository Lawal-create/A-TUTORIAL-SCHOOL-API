import express from "express";

const app = express();

const port = "3000";
const server = app.listen(port, () => {
  console.log(`Server is currently running at port ${port}`);
});

export default server;
