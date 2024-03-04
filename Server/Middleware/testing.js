const testing = async (req, res, next) => {
  try {
    console.log("test passed");
    next();
  } catch (e) {
    console.log("this is error ", e);
  }
};

module.exports = {
  testing,
};
