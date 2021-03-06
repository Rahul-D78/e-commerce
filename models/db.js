require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize('ecdb','euser','789Qweasz,',{
    dialect: 'mysql',
    host: process.env.DB_HOST,
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
   image: {
        type: Sequelize.STRING,
        allowNull: true
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

//TODO: --- Implement releted items via the category and the price and tage

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
        type: Sequelize.INTEGER,
        allowNull: false,
        // default: 0.0
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
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

// const Cart = db.define('Cart', {

// })

User.hasMany(Product)
Product.belongsTo(User)

db.sync({force: false})
.then(() => {
    console.log(`Database created`);
}).catch((e) => {
    console.log(`error  ${e} creating the db`);
});

exports = module.exports = {User, Product}