// import "../css/signUpChoice.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpChoice = () => {
  const navigate = useNavigate();

  const student = () => {
    navigate("/signUp/student");
  }

  const tutor = () => {
    navigate("/signUp/tutor");
  }

  return (
    <>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-3 justify-content-center" style={{ marginBottom: "40px", display: "inline-flex" }}>
        <div className="card my-4 shadow" style={{ maxWidth: "340px", display: "inline-flex" }}>
          <img
            className="card-img-top"
            src="./images/studentSignUpIMG.jpg"
            alt="StudentSignupImage"
          />
          <div className="card-body">
            <p className="card-text">
              Connect with thousands of teachers, teaching the subjects that
              you want to learn and excell in. <br />
              Discuss and decide on the platform of your choice to keep
              classes on and sharing of the notes. <br />
              Review tutors based on their teaching style.
            </p>
            <button onClick={student} className="btn btn-outline-dark offset-1">
              CREATE A STUDENT ACCOUNT
            </button>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-3 justify-content-center" style={{ margin: "0", display: "inline-flex" }}>
        <div className="card my-4 shadow" style={{ maxWidth: "340px", display: "inline-flex" }}>
          <img
            className="card-img-top"
            src="./images/tutorSignUpIMG.jpg"
            alt="TutorSignupImage"
          />
          <div className="card-body">
            <p className="card-text">
              You know something that you would like to share with a pool of
              eager learners, at the same time earning some money on your
              mutual understanding with students. <br />
              Expand your class with a wide range of students, on the teaching
              platform that you prefer.
            </p>
            <button onClick={tutor} className="btn btn-outline-dark offset-1">
              CREATE A TUTOR ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpChoice;
