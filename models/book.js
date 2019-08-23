"use strict";
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define("Books", {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    author: {
      type: DataTypes.STRING
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  });
  return Books;
};