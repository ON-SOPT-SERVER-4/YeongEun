module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Project', {
        
        name :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        subName :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        category :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        term :{
            type : DataTypes.STRING(20),
            allowNull : false,
        },
        detail :{
            type : DataTypes.STRING(200),
            allowNull : false,
        },
    },{
        freezeTableName : true,
        timestamps : false
    });
};
