import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "datatables.net";

const ChangeRequests = () => {
  let navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/tutorsListWithNewContent`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((response) => {
        setTutors(response.data);
        $(document).ready(function () {
          $("#changes").dataTable({
            responsive: true,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loaddata = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/tutorsListWithNewContent`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get(`${process.env.REACT_APP_SERVER_URL}/api/tutorsListWithNewContent`, {
    //     headers: { Authorization: `Bearer ${cookies.token}` },
    //   })
    //   .then((response) => {
    //     if (response.data.length > 0) {
    //       // setTutors(response.data);
    //       setTutors([]);
    //     } else {
    //       setTutors([]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const handleDownload = (l) => {
    const link = document.createElement("a");
    link.href = l;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isApprove = (bool, id) => {
    let decision = {
      id: id,
      isApproved: bool,
    };
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/approveNewContent`,
        decision,
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      )
      .then((response) => {
        if (response.status === 200) loaddata();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.datatables.net/1.11.4/css/jquery.dataTables.css"
      ></link>
      <div className="container mt-3">
        <div className="row">
          <div className="container mt-1 mb-3">
            <h3>Tutors</h3>
          </div>
        </div>
        <hr />
        <div className="card">
          <div className="card-body">
            {tutors.length >= 0 ? (
              <table className="table table-hover mt-1" id="changes">
                <thead>
                  <tr>
                    <th scope="col">Content type</th>
                    <th scope="col">New Content</th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Email-ID
                    </th>
                    <th scope="col" style={{ textAlign: "center" }}>
                      Approve
                    </th>
                    <th style={{ textAlign: "center" }}>Disapprove</th>
                  </tr>
                </thead>
                <tbody>
                  {tutors.map((tutor) => (
                    <tr key={tutor.ID}>
                      <td>{tutor.CONTENT_TYPE.toString().toUpperCase()}</td>
                      <td>
                        {tutor.CONTENT_TYPE === "bio" ? (
                          tutor.CONTENT
                        ) : tutor.CONTENT_TYPE === "cv" ? (
                          <>
                            <button
                              className="btn btn-outline-dark"
                              onClick={() => {
                                handleDownload(
                                  `${process.env.REACT_APP_RESUME_URL}${tutor.CONTENT}`
                                );
                              }}
                            >
                              Download CV
                            </button>
                          </>
                        ) : (
                          <img
                            src={
                              tutor.CONTENT
                                ? `${process.env.REACT_APP_PROFILE_URL}${tutor.CONTENT}`
                                : null
                            }
                            style={{
                              width: "65px",
                              height: "65px",
                              borderRadius: "50%",
                            }}
                            alt="avatar"
                          />
                        )}
                      </td>
                      <td style={{ textAlign: "center" }}>{tutor.EMAIL}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-outline-success"
                          onClick={() => {
                            isApprove(1, tutor.ID);
                          }}
                        >
                          Approve
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => {
                            isApprove(2, tutor.ID);
                          }}
                        >
                          Disapprove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="card-body">
                <div className="container d-flex justify-content-center my-5">
                  <h3>No approved tutors available</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeRequests;
