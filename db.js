const Sequelize = require('sequelize');

const db = new Sequelize('shopdb', 'shop', 'shpass', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        min: 0,
        max: 5,
    }
});

const User = db.define('User', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull : false
    },

});

const Product = db.define('Product', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false
    },
    manufacture: Sequelize.STRING,
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    }
});

db.sync()
  .then(() => {
      console.log('database has been created');
  })
  .catch((err) => {
      console.error('error createing the datbase' + err);
  })

exports = module.exports = {
    User, Product
}