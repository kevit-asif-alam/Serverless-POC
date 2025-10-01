const items = require("./items");

module.exports.createItem = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const newItem = {
      id: String(items.length + 1),
      ...body,
    };

    items.push(newItem);

    return {
      statusCode: 201,
      body: JSON.stringify(newItem),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
