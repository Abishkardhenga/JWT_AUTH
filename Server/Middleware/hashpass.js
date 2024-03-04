const bcrypt = require("bcrypt");

const saltRound = 10;
const hashPassword = async (password) => {
  try {
    const data = bcrypt.hash(password, saltRound);
    if (!data) {
      console.log("No data is available to hash");
    } else {
      return data;
    }
  } catch (e) {
    console.log("this is hashed error", e);
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

module.exports = { hashPassword, verifyPassword };
