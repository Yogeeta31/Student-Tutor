const dbConnection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var _ = require("underscore");
// controller actions

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const maxAge = 7 * 24 * 60 * 60;
const createToken = (id, role_id) => {
  return jwt.sign({ id, role_id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  const params = req.body;
  console.log(params);
  if (params.role_id === 3) {
    let chkEmail = await checkEmail(params.email);
    if (chkEmail === 0) {
      return res.status(400).json({
        errors: {
          email: "Invalid Email. Only Student of Hochschule Fulda can register",
        },
      });
    }
  }
  let hashedPassword = await hashPassword(params.password);

  let user_id;
  let tutor_id;
  var sqlCreateUser = `INSERT INTO USER ( NAME, MOBILE_NO,GENDER, EMAIL, PASSWORD, ROLE_ID,HAS_PERMISSION, BIO,IMAGE) VALUES 
  ("${params.name}",${params.phone},"${params.gender}","${
    params.email
  }","${hashedPassword}",${params.role_id},${params.role_id == 1},${
    params.bio == undefined ? "" : '"' + params.bio + '"'
  },${params.image != undefined ? '"' + params.image + '"' : null})`;
  dbConnection.query(sqlCreateUser, (err, result) => {
    if (err) {
      if (err.sqlMessage.includes("Duplicate entry")) {
        return res
          .status(400)
          .json({ errors: { email: "Email Already Exists" } });
      } else {
        res.status(400).json(err);
      }
    }
    user_id = result.insertId;
    const jwt = createToken(user_id, params.role_id);
    if (params.role_id == 2) {
      var sqlCreateTutor = `INSERT INTO TUTOR (USER_ID, IS_ACTIVE, CV,IS_APPROVED)
        VALUES (${user_id}, 0,${
        params.cv != undefined ? '"' + params.cv + '"' : null
      },0)`;
      dbConnection.query(sqlCreateTutor, async (err, result) => {
        if (err) {
          return res.status(400).json(err);
        }

        tutor_id = result.insertId;
        for await (let subject of params.subjects) {
          var sqlCreateSubject = `INSERT INTO SUBJECT (SUBJECT_NAME, USER_ID, PRICE) VALUES ("${subject.subject_name}",${user_id},${subject.price})`;
          dbConnection.query(sqlCreateSubject, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
            subject_id = result.insertId;
            //[15:08] Mohammed AfwanREVIEW VARCHAR(400), RATING INT, FROM_USER_ID INT, TO_USER_ID INT, SUBJECT_ID INT,

            var sqlCreateReview = `INSERT INTO REVIEWS (TO_USER_ID, SUBJECT_ID, RATING) VALUES (${user_id},${subject_id},0)`;
            dbConnection.query(sqlCreateReview, (err, result) => {
              if (err) {
                console.log(err);
              }
            });
          });
        }
      });
    }
    res.status(200).json({ id: user_id, token: jwt, role_id: params.role_id });
  });
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  const loginUser = `SELECT u.PASSWORD, u.USER_ID, u.ROLE_ID
    FROM USER u
    WHERE u.EMAIL = "${email}"`;

  dbConnection.query(loginUser, async (err, result) => {
    if (err) {
      return res.status(400).json(err);
    }
    const data = JSON.parse(JSON.stringify(result));
    if (_.isEmpty(data)) {
      res.status(200).json({ errors: { email: "Email Does not exist" } });
    } else {
      const hashedPassword = data[0].PASSWORD;
      const user_id = data[0].USER_ID;
      const role_id = data[0].ROLE_ID;

      const isSame = await bcrypt.compare(password, hashedPassword);
      if (isSame) {
        const jwt = createToken(user_id, role_id);
        res.status(200).json({ id: user_id, token: jwt, role_id: role_id });
      } else {
        res.status(200).json({ errors: { password: "Incorrect Password" } });
      }
    }
  });
};

const checkEmail = async (email) => {
  let validEmail = ["@hs-fulda.com"];
  if (validEmail.some((v) => email.includes(v))) {
    return 1;
  } else {
    return 0;
  }
};
