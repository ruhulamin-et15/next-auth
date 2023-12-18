import jwt from "jsonwebtoken";

const AUTH = process.env.AUTH_JWT || "ssssaaaa";
const FORGET = process.env.FORGET_JWT || "ssssaa";

//user token generate
export const GenerateToken = async (user) => {
  const token = await jwt.sign(
    { userId: user._id, admin: user.isAdmin },
    AUTH,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

//verify token for decoded token
export const VerifyToken = async (token) => {
  const verified = await jwt.verify(token, AUTH);
  return verified;
};

//forget token generate
export const GenerateForgetToken = async (user, email) => {
  const token = await jwt.sign({ userId: user._id }, `${FORGET}${email}`, {
    expiresIn: "1h",
  });
  return token;
};

//verify token for forget password
export const VerifyForgetToken = async (token, email) => {
  const verified = await jwt.verify(token, `${FORGET}${email}`);
  return verified;
};
