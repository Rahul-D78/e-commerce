const Sequelize = require('sequelize');

const db = new Sequelize('ecdb','ecuser','pass',{
    dialect: 'mysql',
    host: 'localhost',
    pool: {
        min: 0,
        max: 5
    }
});

const User = db.define('User',{
   id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true
   },
   name: {
       type: Sequelize.STRING,
       allowNull: false
   },
   password: {
       type: Sequelize.STRING,
       allowNull: true
   },
   email: {
       type: Sequelize.STRING,
       allowNull: false
   },
   address : {
       type: Sequelize.STRING,
       allowNull: true
   },
   telephone: {
       type: Sequelize.INTEGER,
       allowNull: true
   },
   token: {
       type: Sequelize.STRING,
       allowNull: true
   }
});

const Product = db.define('Product', {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        default: 0.0
    },
    image :{
       type: Sequelize.STRING,
       allowNull: true
    },
    review: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    manufacture : {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

User.hasMany(Product)
Product.belongsTo(User)

db.sync({force: false})
.then(() => {
    console.log(`Database created`);
}).catch((e) => {
    console.log(`error  ${e} creating the db`);
});

exports = module.exports = {User, Product}