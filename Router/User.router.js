import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Hello World!");
});
userRouter.get("/:id", (req, res) => {
  res.send("Hello World!");
});

userRouter.post("/", (req, res) => {
  res.send("Hello World!");
});
userRouter.put("/:id", (req, res) => {
  res.send("Hello World!");
});
userRouter.delete("/:id", (req, res) => {
  res.send("Hello World!");
});
export default userRouter;
