//const { DataTypes } = require("sequelize/types");
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Post', {
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
        postImageUrl: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    }, {
        //모델의 옵션들을 지정하는곳    
        freezeTableName: true, //테이블옵션지정
        timestamps: true, //게시글이 언제 업데이트 됐는지 
    });
}