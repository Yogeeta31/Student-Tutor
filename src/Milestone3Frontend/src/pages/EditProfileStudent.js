import "../css/studentSignUp.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const EditProfileStudent = () => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["user"]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNum: "",
    emailID: "",
    pass: "",
    confirmPass: "",
    gender: "",
    image: "",
  });

  const [imageFirst, setImageFirst] = useState("");

  const loadData = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/getStudentDetails?user_id=${cookies.userid}`,
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      )
      .then((response) => {
        const data = response.data;

        let newFormData = {
          fullName: data.NAME,
          mobileNum: "+" + data.MOBILE_NO,
          emailID: data.EMAIL,
          pass: "",
          confirmPass: "",
          gender: data.GENDER,
          image: data.IMAGE,
        };
        setFormData(newFormData);

        setImageFirst(`${process.env.REACT_APP_PROFILE_URL}${data.IMAGE}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const [editGenClick, setEditGenClick] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [removeSelectedImg, setRemoveSelectedImg] = useState("");

  const [imageMessage, setImageMessage] = useState("");

  const [nameError, setNameError] = useState("");

  const [mobileNumError, setMobileNumError] = useState("");

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

  const editGenInfo = (e, bool) => {
    e.preventDefault();
    if (bool) {
      setEditGenClick("Set");
    } else {
      setEditGenClick("");
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    let flag = true;
    if (!selectedImage) {
      flag = false;
    }
    if (flag) {
      let newSelectedImage = new File(
        [selectedImage],
        Date.now() + selectedImage.name.toLowerCase().split(" ").join("-"),
        {
          type: selectedImage.type,
        }
      );

      const formImage = new FormData();
      formImage.append("filename", newSelectedImage);

      axios
        .post(
          "https://uploadresume.azurewebsites.net/api/uploadImage",
          formImage
        )
        .then((imageResponse) => {
          let newContent = {
            userID: cookies.userid,
            imageName: imageResponse.data.name,
          };
          axios
            .patch(
              `${process.env.REACT_APP_SERVER_URL}/api/updateStudentImage`,
              newContent,
              {
                headers: { Authorization: `Bearer ${cookies.token}` },
              }
            )
            .then((response) => {
              loadData();
              setRemoveSelectedImg("");
              setImageMessage(response.data.message);
            })
            .catch((error) => {
              console.log(error);
            });
        });
    }
  };

  const submitGenInfo = (e) => {
    e.preventDefault();
    let flag = true;
    if (!formData.fullName) {
      flag = false;
      setNameError("Please Enter Your Name");
    } else {
      setNameError("");
    }
    if (!/\(?49\)?[ ()]?([- ()]?\d[- ()]?){11}/.test(formData.mobileNum)) {
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
      let user = {
        user_id: cookies.userid,
        name: formData.fullName,
        email: formData.emailID,
        phoneNo: formData.mobileNum,
        gender: formData.gender,
        password: formData.pass,
        // role_id: 2,
      };
      axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/api/updateStudentDetails`,
          user,
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
          }
        )
        .then((response) => {
          if (response.data.hasOwnProperty("errors")) {
            setPassError(response.data.errors.password);
          } else {
            loadData();
            editGenInfo(e, false);
          }
        })
        .catch((error) => {
          console.log(error);
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
                Edit Profile
              </h3>
            </div>
            <div></div>
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
                ) : imageFirst ? (
                  <img
                    className="rounded-circle mt-5"
                    width="180px"
                    height="180px"
                    style={{ objectFit: "contain" }}
                    src={imageFirst}
                    alt="ProfileImage"
                  />
                ) : (
                  <img
                    className="rounded-circle mt-5"
                    width="180px"
                    height="180px"
                    style={{ objectFit: "contain" }}
                    src="../images/profileIMG.jpg"
                    alt="ProfileImage"
                  />
                )}
                {removeSelectedImg ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-success mt-2"
                      onClick={uploadImage}
                    >
                      Upload Image
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger mt-1"
                      onClick={() => {
                        removeImg();
                        setImageMessage("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <label className="btn btn-outline-dark mt-2">
                      <input
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                          setImage(event.target.files[0]);
                        }}
                      />
                      Change Image
                    </label>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {imageMessage}
                    </span>
                  </>
                )}
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
                      disabled={editGenClick ? false : true}
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
                      disabled={editGenClick ? false : true}
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
                        checked={formData.gender === "Male" ? "checked" : ""}
                        disabled={editGenClick ? false : true}
                        onClick={(e) =>
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
                        checked={formData.gender === "Female" ? "checked" : ""}
                        disabled={editGenClick ? false : true}
                        onClick={(e) =>
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
                        checked={formData.gender === "NA" ? "checked" : ""}
                        disabled={editGenClick ? false : true}
                        onClick={(e) =>
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
                  {editGenClick ? (
                    <>
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
                          Confirm Password{" "}
                          <span style={{ color: "Red" }}>*</span>
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
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-success mt-2"
                          onClick={(e) => {
                            submitGenInfo(e);
                          }}
                        >
                          Submit
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-outline-danger mt-2"
                          onClick={(e) => {
                            editGenInfo(e, false);
                            loadData();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-dark mt-2 col-md-11"
                          onClick={(e) => {
                            editGenInfo(e, true);
                          }}
                        >
                          Update Details
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileStudent;
