const Sequelize = require("sequelize");
const dbConfig =  ("../config/connection");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);


// import models
const models = {
    Product:require("./Product"),
    Category:  require("./Category"),
    Tag: require("./Tag"),
    ProductTag: require("./ProductTag"),
};

// Products belongsTo Category
models.Product.belongsTo(models.Category, {foreignKey: "category_id"});

// Categories have many Products
models.Category.hasMany(models.Product, {foreignKey: "category_id"});

// Products belongToMany Tags (through ProductTag)
models.Product.belongsToMany(models.Tag, {
  trough:models.ProductTag,
  foreignKey: "product_id",
});
// Tags belongToMany Products (through ProductTag)
models.Tag.belongsToMany(models.Product, {
  through: models.ProductTag,
  foreignKey: "tag_id",
});

module.exports = { sequelize, models };

