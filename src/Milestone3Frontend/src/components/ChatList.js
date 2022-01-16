import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../css/chatList.css";

const ChatList = () => {
  const [listOfPeople, setListOfPeople] = useState([]);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    let role;
    if (cookies.role === "student") {
      role = 3;
    } else if (cookies.role === "tutor") {
      role = 2;
    } else {
      role = 1;
    }

    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/message/getMessagingList/?userId=${cookies.userid}&roleId=${role}`,
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        setListOfPeople(response.data);
      })
      .catch((err) => {
        if (err.response.status === 404) console.log("Error");
      });
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card">
              <div id="plist" className="people-list">
                <ul className="list-unstyled chat-list mt-2 mb-0">
                  {listOfPeople.map((person) => (
                    <Link
                      to={`/chat/${person.userId}`}
                      key={person.userId}
                      style={{ color: "black" }}
                    >
                      <li className="clearfix">
                        <img
                          src={
                            process.env.REACT_APP_PROFILE_URL +
                            person.profilePicture
                          }
                          alt="Profile Pic"
                          style={{
                            objectFit: "cover",
                            width: "180px",
                            height: "180px",
                          }}
                        />
                        <div className="about">
                          <div className="name">{person.userName}</div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatList;
