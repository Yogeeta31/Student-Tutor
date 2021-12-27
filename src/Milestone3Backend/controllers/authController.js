const dbConnection = require("../db");
// controller actions

module.exports.signup_post =  (req, res) => {
    const params = req.body;
    let user_id;
    let tutor_id = null;
    var sqlCreateUser = `INSERT INTO User ( NAME, MOBILE_NO, EMAIL, PASSWORD, ROLE_ID, HAS_PERMISSION,IMAGE) VALUES ("${params.name}", ${params.phone}, "${params.email}", "${params.password}", ${params.role_id}, ${params.role_id==1},${(params.image != undefined) ? params.image : null})`;
    dbConnection.query(sqlCreateUser, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log("insertId::"+result.insertId);
        user_id = result.insertId;
        if(params.role_id==2){
            console.log("User2::"+user_id);
            var sqlCreateTutor = `INSERT INTO Tutor (USER_ID, IS_ACTIVE, SUBJECT_ID, PRICE, CV)
        VALUES (${user_id}, 1,101,200,${(params.cv != undefined) ? params.cv : null})`;
            dbConnection.query(sqlCreateTutor, (err, result) => {
                if (err) {
                    console.log(err);
                }
                tutor_id = result.insertId;
            });
        }
        console.log("User::"+user_id);
    });


    res.send("Successfully Signed up");
}

module.exports.login_post =  (req, res) => {

}