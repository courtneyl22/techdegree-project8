"use strict";
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define("Books", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "Title"',
        },
        notEmpty: {
          msg: 'Please provide a value for "Title"',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "Author"',
        },
        notEmpty: {
          msg: 'Please provide a value for "Author"',
        },
      },
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  });
  return Books;
};