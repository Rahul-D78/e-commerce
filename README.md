## Technologies Used :

1. Node.JS    -- platform
2. Javascript -- programing lang
3. Sequelize  -- ORM
4. ejs        -- template engine
6. MySQL      -- Database
7. Express    -- Framework
8. JWT        -- Authentication

## Prepare DB in the following steps as root :

```SQL
create database ecomdb;

create user ecomuser identified by 'pass';

use ecomdb;

grant all privileges on ecomdb.* to ecomuser;
```

## Installation :
```
1. Install the app with required dependencies .
$npm install

2. Prepare the database with the prepare db commands .

3. Run the app using nodemon.
$npm start
```