const bcrypt = require('bcrypt');

const hashed = '$2b$10$7p4KS9MRKWyIr2Y.dm7FkuZr/uP6ik3YSULXz5Q9CFZDsorhL7Ll2';

const pass =  "passowrd@123";

const res = bcrypt.compare(pass,hashed).then((result)=>
{
    console.log(result);
})