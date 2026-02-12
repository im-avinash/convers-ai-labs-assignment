const crypto = require("crypto");
const { getSecretFromDB } = require("./mockDb");

const generateToken = async (email) => {
  try {
    const secret = await getSecretFromDB();

    return crypto
      .createHmac("sha256", secret)
      .update(email)
      .digest("base64");
  } catch (error) {
    console.error("Error generating token:", error); // Log the error for debugging
    throw error; // Rethrow the error to be handled by the caller
  }
};

module.exports = { generateToken };
