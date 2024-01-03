const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthenticatedError("Invalid Authentication");
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = extractUserFields(decoded);
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({ msg: error.message });
  }
};

const extractUserFields = (decoded) => {
  const userFields = [
    "userid",
    "firstName",
    "lastName",
    "country",
    "state",
    "address",
    "city",
    "postalCode",
    "dateOfBirth",
    "gender",
    "bvn",
    "isSoleProprietor",
    "description",
    "businessName",
    "googleId",
    "phoneNumber",
    "uniqueKey",
    "email",
    "accountNumber",
    "bank",
    "role",
    "createdAt",
    "dob",
  ];

  return userFields.reduce((user, field) => {
    if (decoded[field] !== undefined) {
      user[field] = decoded[field];
    }
    return user;
  }, {});
};

module.exports = authenticateUser;
