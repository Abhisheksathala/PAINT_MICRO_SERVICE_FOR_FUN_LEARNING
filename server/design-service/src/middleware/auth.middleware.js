const authenticatedRequest = (req, res, next) => {
  const userId = req.headers["x-user-id"];
  console.log(userId,"userId")
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.userId = userId;
  next();
};

export default authenticatedRequest;
