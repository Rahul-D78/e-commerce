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
       allowNull: false
   },
   email: {
       type: Sequelize.STRING,
       allowNull: false
   },
   address : {
       type: Sequelize.STRING,
       allowNull: false
   },
   telephone: {
       type: Sequelize.INTEGER,
       allowNull: false
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
    review: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    manufacture : {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.hasMany(Product)


db.sync()
.then(() => {
    console.log(`Database created`);
}).catch((e) => {
    console.log(`error  ${e} creating the db`);
});

exports = module.exports = {User, Product}