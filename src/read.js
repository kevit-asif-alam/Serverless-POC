const items = require("./items");

module.exports.getItems = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};

module.exports.getItem = async (event) => {
  const { id } = event.pathParameters;
  const item = items.find((i) => i.id === id);

  if (!item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Item not found" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};
