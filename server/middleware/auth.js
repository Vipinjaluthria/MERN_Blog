import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.spilt(" ")[1];
    const isCustomAuth = token.length < 500;
    let DecodeData;
    if (isCustomAuth && token) {
      DecodeData = jwt.verify(token, "test");
      req.userId = DecodeData?.id;
    } else {
      DecodeData = jwt.decode(token);
      req.userId = DecodeData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
