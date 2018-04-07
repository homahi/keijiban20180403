'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/keigiban',
  { logging: false });
const list = sequelize.define('lists', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  contributor: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.STRING
  }
},{
  freezeTableName: true,
  timestamps: true
});

list.sync();
module.exports = list;