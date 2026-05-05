const Product = require("../model/Product");

exports.sendResults = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid IDs provided" });
    }

    const products = await Product.find({
      _id: { $in: ids },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
