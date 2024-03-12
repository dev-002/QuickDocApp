module.exports = async (req, res, next) => {
  const { role } = req.body;
  if (role) {
    if (role == 2) next();
    else return res.status(401).json({ ack: false, err: "Not Authorized" });
  } else
    return res
      .status(500)
      .json({ ack: false, err: "Not Logged In or UnAuthorized" });
};
