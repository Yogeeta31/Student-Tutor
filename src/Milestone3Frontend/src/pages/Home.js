import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const searchTutors = () => {
    navigate("/searchTutors");
  };

  const signUp = () => {
    navigate("/signUp");
  };

  const chat = () => {
    navigate("/chats");
  };

  return (
    <>
      <main role="main">
        <div
          id="carouselExampleCaptions"
          className="carousel slide mt-1 mb-3"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ maxHeight: "550px" }}>
              <img src="./images/brd.jpg" className="d-block w-100" alt="..."
              />
              <div className="carousel-caption d-md-block" style={{ color: "white" }}>
                <h5>Signup as Student or Tutor</h5>
                <p>You can either be a tutor or learn a skill as student!</p>
              </div>
            </div>
            <div className="carousel-item" style={{ maxHeight: "550px" }}>
              <img src="./images/cht.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-md-block" style={{ color: "white" }}>
                <h5>Chat with Each other</h5>
                <p>Chat with your tutuor or your students</p>
              </div>
            </div>
            <div className="carousel-item" style={{ maxHeight: "550px" }}>
              <img src="./images/rev.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-md-block" style={{ color: "black" }}>
                <h5>Review the tutors</h5>
                <p>Review and Rate the tutors on their teaching style</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <hr className="featurette-divider" />
        <div className="container marketing">
          <div className="row">
            <div className="col-lg-4" style={{ "textAlign": "center" }}>
              <img
                className="rounded-circle"
                src="./images/roundIMG1.jpg"
                alt="Generic placeholder image"
                width="140"
                height="140"
              />
              <h2>Search Tutors</h2>
              <p>
                Search from thousands of tutors teaching various subjects/topics
                ranging from "How to code" to "How to do taxes". Filter them
                according to their topic wise ratings. Chat with them and decide
                your timings and price for learning sessions.
              </p>
              <p>
                <a
                  className="btn btn-secondary"
                  onClick={searchTutors}
                  role="button"
                >
                  Search Tutors »
                </a>
              </p>
            </div>
            <div className="col-lg-4" style={{ "textAlign": "center" }}>
              <img
                className="rounded-circle"
                src="./images/roundIMG2.jpg"
                alt="Generic placeholder image"
                width="140"
                height="140"
              />
              <h2>Signup</h2>
              <p>
                Signup as a student and connect from thousands of tutors,
                teaching hundereds of topics. Discuss and decide the format of
                classes. <br />
                Or, signup as a tutor, share your knowledge & make money
                teaching.
              </p>
              <p>
                <a className="btn btn-secondary" onClick={signUp} role="button">
                  Signup Now »
                </a>
              </p>
            </div>
            <div className="col-lg-4" style={{ "textAlign": "center" }}>
              <img
                className="rounded-circle"
                src="./images/roundIMG3.png"
                alt="Generic placeholder image"
                width="140"
                height="140"
              />
              <h2>Chatting</h2>
              <p>
                As a student chat with the tutors about the timings and dicuss
                with them the schedule for the classes. As a tutor chat with the
                students and call them on your favorite platform or in presence
                in your own classes.
              </p>
              <p>
                <a className="btn btn-secondary" onClick={chat} role="button">
                  Chat »
                </a>
              </p>
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                Tutors can approve a request.&nbsp;
                <span className="text-muted">Message request approval.</span>
              </h2>
              <p className="lead">
                A tutor receives the first message from a student as a request
                to accept the student. A tutor can accept the message request or
                reject the message request depending on whether the tutor
                wants/can accept a new student for the requested course.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="featurette-image img-fluid mx-auto"
                data-src="holder.js/500x500/auto"
                alt="500x500"
                style={{ width: "500px", maxHeight: "500px" }}
                src="./images/featureIMG1.jpg"
                data-holder-rendered="true"
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7 order-md-2">
              <h2 className="featurette-heading">
                Integrated Chatting.&nbsp;
                <span className="text-muted">
                  Dedicated Live Chatting with Notifications.
                </span>
              </h2>
              <p className="lead">
                Students and tutors can live chat and discuss the issues of
                classes, time-table and appointments of classes or even some
                doubts from the studies. Apart from live chat there are in-app
                notifications which are recieved when student or tutor sends a
                message to each other. And finally the messages are stored in
                DB.
              </p>
            </div>
            <div className="col-md-5 order-md-1">
              <img
                className="featurette-image img-fluid mx-auto"
                data-src="holder.js/500x500/auto"
                alt="500x500"
                src="./images/featureIMG2.jpg"
                data-holder-rendered="true"
                style={{ width: "500px", maxHeight: "500px" }}
              />
            </div>
          </div>

          <hr className="featurette-divider" />

          <div className="row featurette">
            <div className="col-md-7">
              <h2 className="featurette-heading">
                Review the tutors.&nbsp;
                <span className="text-muted">Subject wise Reviews!</span>
              </h2>
              <p className="lead">
                Students can give reviews and rate the tutors based on their way
                of teaching and subject coverage etc. Tutors can be reviewed
                subject wise.
              </p>
            </div>
            <div className="col-md-5">
              <img
                className="featurette-image img-fluid mx-auto"
                data-src="holder.js/500x500/auto"
                alt="500x500"
                src="./images/featureIMG3.png"
                data-holder-rendered="true"
                style={{ width: "500px", maxHeight: "500px" }}
              />
            </div>
          </div>

          <hr className="featurette-divider" />
        </div>
      </main>
    </>
  );
};
export default Home;
