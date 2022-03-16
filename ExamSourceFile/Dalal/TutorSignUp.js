import "../../css/tutorSignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TutorSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNum: "",
    emailID: "",
    pass: "",
    confirmPass: "",
    gender: "",
    bio: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [removeSelectedImg, setRemoveSelectedImg] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [removeSelectedFile, setRemoveSelectedFile] = useState("");

  const [fileError, setFileError] = useState("");

  const [ImageError, setImageError] = useState("");

  const [bioError, setBioError] = useState("");

  const [nameError, setNameError] = useState("");

  const [mobileNumError, setMobileNumError] = useState("");

  const [emailError, setEmailError] = useState("");

  const [passwordError, setPassError] = useState("");

  const [confirmPassEmpty, setConfirmPassEmpty] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const [genderSelect, setGenderSelect] = useState("");

  const [subPriceError, setSubPriceError] = useState([""]);

  const [fileName, setFileName] = useState("");

  const [subPrice, setSubPrice] = useState([{ subject_name: "", price: "" }]);

  const chkSubPrice = () => {
    for (let i = 0; i < subPrice.length; i++) {
      if (!subPrice[i].subject_name || !subPrice[i].price) {
        setSubPriceError("Subject and Prices are inconsistently written");
        return false;
      }
    }
    setSubPriceError("");
    return true;
  };

  const updatedSubPrice = (index, subject_name, price) => {
    let newSubPrice = [...subPrice];
    newSubPrice[index] = {
      subject_name: subject_name,
      price: price,
    };
    setSubPrice(newSubPrice);
  };

  const addSub = () => {
    if (chkSubPrice()) {
      let newSubPrice = [...subPrice];
      newSubPrice.push({ subject_name: "", price: "" });
      setSubPrice(newSubPrice);
    }
  };

  const remSub = () => {
    if (subPrice.length > 1) {
      let newSubPrice = [...subPrice];
      newSubPrice.pop();
      setSubPrice(newSubPrice);
    }
  };

  const removeImg = () => {
    setRemoveSelectedImg("");
    setSelectedImage(null);
  };

  const setImage = (image) => {
    setSelectedImage(image);
    if (image) {
      setRemoveSelectedImg("Set");
      setImageError("");
    } else {
      removeImg();
    }
  };

  const removeFile = () => {
    setRemoveSelectedFile("");
    setSelectedFile(null);
    setFileName("");
  };

  const setFile = (file) => {
    setSelectedFile(file);
    if (file) {
      setRemoveSelectedFile("Set");
      setFileName(file.name);
      setFileError("");
    } else {
      removeFile();
    }
  };

  const submit = (e) => {
    e.preventDefault();
    let flag = true;
    if (!selectedFile) {
      flag = false;
      setFileError("Please Upload CV");
    } else {
      setFileError("");
    }
    if (!selectedImage) {
      flag = false;
      setImageError("Please Upload Image");
    } else {
      setImageError("");
    }
    if (!formData.bio) {
      flag = false;
      setBioError("Please Write something about yourself");
    } else {
      setBioError("");
    }
    if (!formData.fullName) {
      flag = false;
      setNameError("Please Enter Your Name");
    } else {
      setNameError("");
    }
    if (!/\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/.test(formData.mobileNum)) {
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
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.emailID)
    ) {
      flag = false;
      setEmailError("Please Enter valid Email");
    } else {
      setEmailError("");
    }
    chkSubPrice();
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
    if (flag && chkSubPrice()) {
      let newSelectedImage = new File(
        [selectedImage],
        Date.now() + selectedImage.name.toLowerCase().split(" ").join("-"),
        {
          type: selectedImage.type,
        }
      );

      const formImage = new FormData();
      e.preventDefault();
      formImage.append("filename", newSelectedImage);

      let newSelectedResume = new File(
        [selectedFile],
        Date.now() + selectedFile.name.toLowerCase().split(" ").join("-"),
        {
          type: selectedFile.type,
        }
      );

      const formResume = new FormData();
      e.preventDefault();
      formResume.append("filename", newSelectedResume);

      axios
        .post(
          "https://uploadresume.azurewebsites.net/api/uploadImage",
          formImage
        )
        .then((imageResponse) => {
          axios
            .post(
              "https://uploadresume.azurewebsites.net/api/uploadResume",
              formResume
            )
            .then((cvResponse) => {
              let user = {
                name: formData.fullName,
                phone: formData.mobileNum,
                email: formData.emailID,
                password: formData.pass,
                gender: formData.gender,
                role_id: 2,
                bio: formData.bio,
                subjects: subPrice,
                cv: cvResponse.data.name,
                image: imageResponse.data.name,
              };
              axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/signup`, user)
                .then((response) => {
                  if (response.status === 200) {
                    navigate("/login");
                  }
                })
                .catch((error) => {
                  if (
                    error.response.status === 400 &&
                    error.response.data.errors.email
                  ) {
                    setEmailError(error.response.data.errors.email);
                  }
                  flag = false;
                });
            });
        });
    }
  };

  return (
    <>
      <div className="container rounded bg-white mt-4 mb-5 shadow">
        <form encType="multipart/form-data">
          <div className="row">
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h3 className="text-right offset-5" style={{ marginBottom: 0 }}>
                Sign Up
              </h3>
            </div>
            <div>
              <p className="offset-6" style={{ marginBottom: 0 }}>
                -As a tutor
              </p>
            </div>
            <div className="col-md-5 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-1">
                {selectedImage ? (
                  <img
                    className="rounded-circle mt-5"
                    width="180px"
                    height="180px"
                    style={{ objectFit: "contain" }}
                    src={URL.createObjectURL(selectedImage)}
                    alt="ProfileImage"
                  />
                ) : (
                  <img
                    className="rounded-circle mt-5"
                    width="180px"
                    height="180px"
                    style={{ objectFit: "cover" }}
                    src="../images/profileIMG.jpg"
                    alt="ProfileImage"
                  />
                )}
                <label className="font-weight-bold text-blue-70 upload mt-2">
                  <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                  Upload Your
                  <br />
                  Recent Image<span style={{ color: "Red" }}>*</span>
                </label>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  {ImageError}
                </span>
                {removeSelectedImg && (
                  <label className="remove mt-1" onClick={removeImg}>
                    Remove Image
                  </label>
                )}
                <label className="font-weight-bold text-blue-70 upload mt-3">
                  <input
                    type="file"
                    name="myFile"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                    }}
                  />
                  Upload Your CV<span style={{ color: "Red" }}>*</span>
                </label>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  {fileError}
                </span>
                {fileName ? <p style={{ margin: 0 }}>{fileName}</p> : <></>}
                {removeSelectedFile && (
                  <label className="remove" onClick={removeFile}>
                    X
                  </label>
                )}
              </div>
              <div className="mt-3">
                <div className="col-md-12">
                  <label className="labels">
                    About Yourself <span style={{ color: "Red" }}>*</span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={formData.bio}
                    onInput={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                  />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    {bioError}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-7 border-right">
              <div className="p-3 py-4">
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
                  {subPrice.map((subP, i) => (
                    <div className="row mt-2" key={i}>
                      <div className="col-md-6">
                        <label className="labels">
                          Subject <span style={{ color: "Red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter a Subject"
                          value={subP.subject_name}
                          onInput={(e) =>
                            updatedSubPrice(i, e.target.value, subP.price)
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="labels">
                          Price <span style={{ color: "Red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Hourly Rate"
                          value={subP.price}
                          onInput={(e) =>
                            updatedSubPrice(
                              i,
                              subP.subject_name,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    {subPriceError}
                  </span>
                  <div>
                    <label
                      onClick={addSub}
                      className="font-weight-bold text-blue-70 upload mt-2"
                    >
                      Add Subject
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {subPrice.length > 1 ? (
                      <label
                        onClick={remSub}
                        className="font-weight-bold text-blue-70 remove mt-2"
                      >
                        Remove Subject
                      </label>
                    ) : null}
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
export default TutorSignUp;

// -------------------- Reviewed by Pratikkumar A. Kakadiya --------------------
// -> In my opinion onstead of using separate state for each error it could be combined in one state as key-value pair
// it will increase code readability and maintainability both.
// -> Code for validating form could be separated as function to further improve maintainability.
