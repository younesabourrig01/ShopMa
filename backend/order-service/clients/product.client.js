const axios = require("axios");
require("dotenv").config();

const PRODUCT_SERVICE = process.env.PRODUCT_SERVICE;
exports.getProductsByIds = async (ids) => {
  try {
    const response = await axios.post(
      `${PRODUCT_SERVICE}/api/products/bulk`,
      { ids },
      {
        timeout: 3000,
        headers: {
          "x-internal-secret": process.env.INTERNAL_SECRET,
        },
      },
    );

    return response.data;
  } catch (error) {
    throw new Error("Product service unavailable");
  }
};
