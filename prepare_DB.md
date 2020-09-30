#prepare the database
Do the following as root

```sql
create database shopdb;

create user shop identified by 'shpass';

use shopdb; 

grant all privillages on shopdb.* to shop; 
```