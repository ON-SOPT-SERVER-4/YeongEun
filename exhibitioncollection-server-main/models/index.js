const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Project = require('./project')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Image = require('./Image')(sequelize, Sequelize);

/** 1 : N   User : Project */
db.User.hasMany(db.Project, { onDelete: 'cascade' });
db.Project.belongsTo(db.User);

/** 1: N Project : Image */
db.Project.hasMany(db.Image, {onDelete : 'cascade'});
db.Image.belongsTo(db.Project);


module.exports = db;
