const mysql = require('mysql'); 

const first_names = ["Ahmed","Pratik","Mohit","John","George","Muller","James","Omar","Hossam","Donald"];
const last_names  = ["James","Bryant","Anand","Trump","Statiya","Hill","Nurmagomedov","Chimaev","Mcregor"];

const createTutors = (req,res,con)=>{

    for(let i = 0; i<25 ; i++)
    {
        const firstname = first_names[Math.round(Math.random()*(first_names.length-1))];
        const lastname = last_names[Math.round(Math.random()*(last_names.length-1))];
        const is_active = Math.round(Math.random());
        const subject_id = Math.round(Math.random()*10);
        const price = Math.round(Math.random()*2000);
        console.log(firstname+" "+lastname);
        var sql = `INSERT INTO tutor (FIRST_NAME,LAST_NAME,IS_ACTIVE, SUBJECT_ID, PRICE) 
        VALUES ("${firstname}", "${lastname}", ${is_active},${subject_id},${price})`;
        con.query(sql,(err, result) => {
            if (err){
                console.log(err)
            }
        })
    }
    res.status(200).send();
}

module.exports = createTutors