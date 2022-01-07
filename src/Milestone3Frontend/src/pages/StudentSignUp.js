import "../css/studentSignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNum: "",
    emailID: "",
    pass: "",
    confirmPass: "",
    gender: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [removeSelectedImg, setRemoveSelectedImg] = useState("");

  const [nameError, setNameError] = useState("");

  const [mobileNumError, setMobileNumError] = useState("");

  const [emailError, setEmailError] = useState("");

  const [passwordError, setPassError] = useState("");

  const [confirmPassEmpty, setConfirmPassEmpty] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const [genderSelect, setGenderSelect] = useState("");

  const removeImg = () => {
    setRemoveSelectedImg("");
    setSelectedImage(null);
  };

  const setImage = (image) => {
    setSelectedImage(image);
    if (image) {
      setRemoveSelectedImg("Set");
    } else {
      removeImg();
    }
  };

  const submit = (e) => {
    e.preventDefault();
    let flag = true;
    if (!formData.fullName) {
      flag = false;
      setNameError("Please Enter Your Name");
    } else {
      setNameError("");
    }
    if (!/\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/.test(formData.mobileNum)
    ) {
      flag = false;
      setMobileNumError("Please Enter a Correct Number");
    } else {
      setMobileNumError("");
    }
    if (!formData.gender) {
      flag = false;
      setGenderSelect("Please Make a Choice");
    } else {
      setGenderSelect("");
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.emailID)) {
      flag = false;
      setEmailError("Please Enter valid Email");
    } else {
      setEmailError("");
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/.test(formData.pass)) {
      flag = false;
      setPassError("Please Enter a Strong Password");
    } else {
      setPassError("");
    }
    let confTemp = true;
    if (!formData.confirmPass) {
      flag = false;
      confTemp = false;
      setConfirmPassEmpty("Please Confirm Your Password");
    } else {
      setConfirmPassEmpty("");
    }
    if (confTemp && formData.confirmPass !== formData.pass) {
      flag = false;
      setConfirmPassError("Password and Confirm Password doesn't match");
    } else {
      setConfirmPassError("");
    }
    if (flag) {
      if (selectedImage) {
        console.log(
          formData.fullName +
          " " +
          formData.mobileNum +
          " " +
          formData.emailID +
          " " +
          formData.gender +
          " " +
          formData.pass +
          " " +
          URL.createObjectURL(selectedImage) +
          " " +
          selectedImage
        );
      } else {
        console.log(
          formData.fullName +
          " " +
          formData.mobileNum +
          " " +
          formData.emailID +
          " " +
          formData.gender +
          " " +
          formData.pass
        );
      }
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5 shadow">
        <form>
          <div className="row">
            <div className="col-md-5 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-1">
                {selectedImage ? (
                  <img
                    className="rounded-circle mt-5"
                    width="180px"
                    height="180px"
                    style={{ objectFit: "contain" }}
                    src={URL.createObjectURL(selectedImage)}
                    alt="DefaultImage"
                  />
                ) : (
                  <img
                    className="rounded-circle mt-5"
                    width="180px"
                    height="180px"
                    style={{ objectFit: "cover" }}
                    src="../images/profileIMG.jpg"
                    alt="DefaultImage"
                  />
                )}
                <label className="font-weight-bold text-blue-70 upload mt-3">
                  <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                  Upload Your
                  <br />
                  Recent Image
                </label>
                {removeSelectedImg && (
                  <label className="remove mt-3" onClick={removeImg}>
                    Remove Image
                  </label>
                )}
              </div>
            </div>
            <div className="col-md-7 border-right">
              <div className="p-3 py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h3
                    className="text-right offset-5"
                    style={{ marginBottom: 0 }}
                  >
                    Sign Up
                  </h3>
                </div>
                <div>
                  <p className="offset-6">-As a student</p>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12">
                    <label className="labels">
                      Name <span style={{ color: "Red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Full Name"
                      value={formData.fullName}
                      onInput={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {nameError}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <label className="labels">
                      Mobile Number <span style={{ color: "Red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Mobile Number"
                      value={formData.mobileNum}
                      onInput={(e) =>
                        setFormData({ ...formData, mobileNum: e.target.value })
                      }
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {mobileNumError}
                    </span>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">
                      Gender <span style={{ color: "Red" }}>*</span>
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value={formData.gender}
                        onInput={(e) =>
                          setFormData({ ...formData, gender: "Male" })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value={formData.gender}
                        onInput={(e) =>
                          setFormData({ ...formData, gender: "Female" })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Female
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        value={formData.gender}
                        onInput={(e) =>
                          setFormData({ ...formData, gender: "NA" })
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                      >
                        Do not disclose
                      </label>
                    </div>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {genderSelect}
                    </span>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">
                      Email ID <span style={{ color: "Red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Email ID"
                      value={formData.emailID}
                      onInput={(e) =>
                        setFormData({ ...formData, emailID: e.target.value })
                      }
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {emailError}
                    </span>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">
                      Password <span style={{ color: "Red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.pass}
                      onInput={(e) =>
                        setFormData({ ...formData, pass: e.target.value })
                      }
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {passwordError}
                    </span>
                  </div>
                  <div className="col-md-12 mt-2">
                    <label className="labels">
                      Confirm Password <span style={{ color: "Red" }}>*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Rewrite Password"
                      value={formData.confirmPass}
                      onInput={(e) =>
                        setFormData({
                          ...formData,
                          confirmPass: e.target.value,
                        })
                      }
                    />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {confirmPassError}
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {confirmPassEmpty}
                    </span>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                    onClick={submit}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default StudentSignUp;
