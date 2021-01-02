module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {

        userImg :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        userName :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        active :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
    },{
        freezeTableName : true,
        timestamps : false
    });
}