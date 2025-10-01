const items = require("./items");

module.exports.deleteItem = async (event) => {
  return {
    statusCode: 204,
    body: JSON.stringify({ message: "Item deleted successfully" }),
  };
};
