module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Image', {

        img :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
    },{
        freezeTableName : true,
        timestamps : false
    });
}