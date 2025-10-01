const items = require("./items");

module.exports.updateItem = async (event) => {
  try {
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);
    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Item not found" }),
      };
    }

    const updatedItem = {
      ...items[itemIndex],
      ...body,
    };

    items[itemIndex] = updatedItem;

    return {
      statusCode: 200,
      body: JSON.stringify(updatedItem),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
