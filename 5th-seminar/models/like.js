/*
const { DataTypes } = require("sequelize/types");
const { sequelize, Post } = require(".");
*/
const { User, Post } = require('../models');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Like', {
        UserId: {
            type: DataTypes.INTEGER,
            reference: {
                model: User,
                key: 'id',
            }
        },
        PostId: {
            type: DataTypes.INTEGER,
            reference: {
                model : Post,
                key: 'id',
            }
        }
    }, {
        freezeTableName: true,
        timeStamps: true,
    })
}