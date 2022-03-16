import "../../css/tutorSignUp.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const EditProfileTutor = () => {
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["user"]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNum: "",
    emailID: "",
    pass: "",
    confirmPass: "",
    gender: "",
    bio: "",
    image: "",
    cv: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [imageFirst, setImageFirst] = useState("");

  const [tutorID, setTutorID] = useState("");

  const loadData = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/getTutorDetails?user_id=${cookies.userid}`,
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      )
      .then((response) => {
        const data = response.data;

        setTutorID(data.TUTOR_ID);

        let newFormData = {
          fullName: data.NAME,
          mobileNum: "+" + data.MOBILE_NO,
          emailID: data.EMAIL,
          pass: "",
          confirmPass: "",
          gender: data.GENDER,
          bio: data.BIO,
          image: data.IMAGE,
          cv: data.CV,
        };
        setFormData(newFormData);

        let newSubjects = data.subjects;
        setSubjects(newSubjects);

        setImageFirst(`${process.env.REACT_APP_PROFILE_URL}${data.IMAGE}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const [addSubjectClick, setAddSubjectClick] = useState("");

  const [editGenClick, setEditGenClick] = useState("");

  const [editBioClick, setEditBioClick] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [removeSelectedImg, setRemoveSelectedImg] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [removeSelectedFile, setRemoveSelectedFile] = useState("");

  const [bioError, setBioError] = useState("");

  const [imageMessage, setImageMessage] = useState("");

  const [fileMessage, setFileMessage] = useState("");

  const [nameError, setNameError] = useState("");

  const [mobileNumError, setMobileNumError] = useState("");

  const [passwordError, setPassError] = useState("");

  const [confirmPassEmpty, setConfirmPassEmpty] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const [genderSelect, setGenderSelect] = useState("");

  const [subPriceError, setSubPriceError] = useState([""]);

  const [fileName, setFileName] = useState("");

  const [subPrice, setSubPrice] = useState({ subject_name: "", price: "" });

  const chkSubPrice = () => {
    if (!subPrice.subject_name || !subPrice.price) {
      setSubPriceError("Subject and Prices are inconsistently written");
      return false;
    }
    setSubPriceError("");
    return true;
  };

  const updatedSubPrice = (subject_name, price) => {
    let newSubPrice;
    newSubPrice = {
      subject_name: subject_name,
      price: price,
    };
    setSubPrice(newSubPrice);
  };

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
    } else {
      removeFile();
    }
  };

  const addSubject = (e, bool) => {
    e.preventDefault();
    if (bool) {
      setAddSubjectClick("Set");
    } else {
      setAddSubjectClick("");
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

  const editBio = (e, bool) => {
    e.preventDefault();
    if (bool) {
      setEditBioClick("Set");
    } else {
      setEditBioClick("");
    }
  };

  const [editSubPriceClick, setEditSubPriceClick] = useState({
    SUBJECT_ID: "",
    SUBJECT_NAME: "",
    PRICE: "",
  });

  const editSubClicked = (sp) => {
    setEditSubPriceClick({
      SUBJECT_ID: sp.SUBJECT_ID,
      SUBJECT_NAME: sp.SUBJECT_NAME,
      PRICE: sp.PRICE,
    });
  };

  const submitEditSub = (e) => {
    e.preventDefault();
    let updateSub = {
      user_id: cookies.userid,
      subject_id: editSubPriceClick.SUBJECT_ID,
      subject_name: editSubPriceClick.SUBJECT_NAME,
      price: editSubPriceClick.PRICE,
    };
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/api/updateTutorSubjects`,
        updateSub,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      )
      .then((response) => {
        setEditSubPriceClick({
          SUBJECT_ID: "",
          SUBJECT_NAME: "",
          PRICE: "",
        });
        loadData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //****************Written by Bibek ----*/
  const uploadFile = (e) => {
    e.preventDefault();
    let flag = true;
    if (!selectedFile) {
      flag = false;
    }
    if (flag) {
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
          "https://uploadresume.azurewebsites.net/api/uploadResume",
          formResume
        )
        .then((cvResponse) => {
          let newContent = {
            tutorId: tutorID,
            contentType: "cv",
            content: cvResponse.data.name,
          };
          axios
            .post(
              `${process.env.REACT_APP_SERVER_URL}/api/updateNewContent`,
              newContent,
              {
                headers: { Authorization: `Bearer ${cookies.token}` },
              }
            )
            .then((response) => {
              loadData();
              setRemoveSelectedFile("");
              setFileName("");
              setFileMessage(response.data.message);
            })
            .catch((error) => {
              console.log(error);
            });
        });
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
            tutorId: tutorID,
            contentType: "image",
            content: imageResponse.data.name,
          };
          axios
            .post(
              `${process.env.REACT_APP_SERVER_URL}/api/updateNewContent`,
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

  //*********---------------------*/

  const submitNewSub = (e) => {
    e.preventDefault();
    if (chkSubPrice()) {
      addSubject(e, false);
      updatedSubPrice("", "");
      let sub = {
        user_id: cookies.userid,
        subject_name: subPrice.subject_name,
        price: subPrice.price,
      };
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/addNewSubject`, sub, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((response) => {
          loadData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /*
   * submitBio : Method used for to submit the tutors bio.
   * @member of {editTutor}
   * @param {tutorId, contentType, content}
   * @returns {} Updated Bio of Tutor.
   * @Author {Mohammed Afwan}
   */
  const submitBio = (e) => {
    e.preventDefault();
    let flag = true;
    if (!formData.bio) {
      flag = false;
      setBioError("Please Write something about yourself");
    } else {
      setBioError("");
    }
    if (flag) {
      let newContent = {
        tutorId: tutorID,
        contentType: "bio",
        content: formData.bio,
      };
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/updateNewContent`,
          newContent,
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
          }
        )
        .then((response) => {
          if (response.data.hasOwnProperty("errors")) {
            setBioError(response.data.errors);
          } else {
            setBioError(response.data.message);
            loadData();
            editBio(e, false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  /*
   * submitGenInfo : Method used for to submit the General Info of a tutors.
   * @member of {editTutor}
   * @param {user_id, name, email, phone, gender, password}
   * @returns {} Updated General Info of Tutor.
   * @Author {Mohammed Afwan}
   */
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
          `${process.env.REACT_APP_SERVER_URL}/api/updateTutorDetails`,
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
/* ******************************************** End of Mohammed Afwan's code *********************************** */
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
                {removeSelectedFile ? (
                  <button
                    type="button"
                    className="btn btn-outline-success mt-2"
                    onClick={uploadFile}
                  >
                    Upload CV
                  </button>
                ) : (
                  <></>
                )}
                {fileName ? <p style={{ margin: 0 }}>{fileName}</p> : <></>}
                {removeSelectedFile ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      removeFile();
                      setFileMessage("");
                    }}
                  >
                    Cancel
                  </button>
                ) : (
                  <>
                    <label className="btn btn-outline-dark mt-3">
                      <input
                        type="file"
                        name="myFile"
                        onChange={(event) => {
                          setFile(event.target.files[0]);
                        }}
                      />
                      Change CV
                    </label>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      {fileMessage}
                    </span>
                  </>
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
                    placeholder="Write About Yourself (bio)"
                    value={formData.bio}
                    disabled={editBioClick ? false : true}
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
              {editBioClick ? (
                <>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-success mt-2 mb-5"
                      onClick={(e) => {
                        submitBio(e);
                      }}
                    >
                      Submit
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      className="btn btn-outline-danger mt-2 mb-5"
                      onClick={(e) => {
                        editBio(e, false);
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
                      className="btn btn-outline-dark mt-2 col-md-11 mb-5"
                      onClick={(e) => {
                        editBio(e, true);
                      }}
                    >
                      Update Bio
                    </button>
                  </div>
                </>
              )}
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

                  <h4 className="mt-3 d-flex justify-content-center">
                    Subjects
                  </h4>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Subject Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((sp) => (
                        <tr
                          key={sp.SUBJECT_ID}
                          // className="d-flex justify-content-center"
                        >
                          {editSubPriceClick.SUBJECT_ID === sp.SUBJECT_ID ? (
                            // <div className="row mt-2">
                            <>
                              <td>
                                <label className="labels">
                                  Subject
                                  <span style={{ color: "Red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter a Subject"
                                  value={editSubPriceClick.SUBJECT_NAME}
                                  onInput={(e) => {
                                    setEditSubPriceClick({
                                      ...editSubPriceClick,
                                      SUBJECT_NAME: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td>
                                <label className="labels">
                                  Price<span style={{ color: "Red" }}>*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Hourly Rate"
                                  value={editSubPriceClick.PRICE}
                                  onInput={(e) => {
                                    setEditSubPriceClick({
                                      ...editSubPriceClick,
                                      PRICE: e.target.value,
                                    });
                                  }}
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-outline-success mt-2"
                                  onClick={(e) => {
                                    submitEditSub(e);
                                  }}
                                >
                                  Submit
                                </button>{" "}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button
                                  type="button"
                                  className="btn btn-outline-danger mt-2"
                                  onClick={() => {
                                    setEditSubPriceClick({
                                      SUBJECT_ID: "",
                                      SUBJECT_NAME: "",
                                      PRICE: "",
                                    });
                                  }}
                                >
                                  Cancel
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{sp.SUBJECT_NAME} </td>
                              <td>{sp.PRICE} </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-outline-dark mt-2"
                                  onClick={() => {
                                    editSubClicked(sp);
                                  }}
                                >
                                  Edit Subject
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {addSubjectClick ? (
                    <>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="labels">
                            Subject<span style={{ color: "Red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter a Subject"
                            value={subPrice.subject_name}
                            onInput={(e) =>
                              updatedSubPrice(e.target.value, subPrice.price)
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="labels">
                            Price<span style={{ color: "Red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Hourly Rate"
                            value={subPrice.price}
                            onInput={(e) =>
                              updatedSubPrice(
                                subPrice.subject_name,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn btn-outline-success mt-2"
                          onClick={(e) => {
                            submitNewSub(e);
                          }}
                        >
                          Submit
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button
                          type="button"
                          className="btn btn-outline-danger mt-2"
                          onClick={(e) => {
                            addSubject(e, false);
                            updatedSubPrice("", "");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-outline-dark mt-2 col-md-11"
                        onClick={(e) => {
                          addSubject(e, true);
                        }}
                      >
                        Add a Subject
                      </button>
                    </div>
                  )}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    {subPriceError}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileTutor;
