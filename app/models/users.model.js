'use strict';
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return Users;
  };