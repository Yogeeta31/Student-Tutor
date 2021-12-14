import Tutors from "../components/Tutors";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";

function SearchTutorsPage() {
  const [tutors, setTutors] = useState(null);
  useEffect(() => {
    axios.get("http://52.166.194.129/api/tutors/").then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        result.data[i].image =
          "https://www.facebeautyscience.com/wp-content/uploads/2020/04/face-beauty-skin-face2-proc.jpg";
      }
      setTutors(result);
    });
  }, []);
  const getTutor = async (e) => {
    let data = await axios.get(
      `http://52.166.194.129/api/tutors/?=&subjectName=${e.target.value}`
    );
    let result = data;
    for (let i = 0; i < result.data.length; i++) {
      result.data[i].image =
        "https://www.facebeautyscience.com/wp-content/uploads/2020/04/face-beauty-skin-face2-proc.jpg";
    }
    setTutors(result);
  };
  return (
    <section>
      {tutors ? (
        <div>
          <h1>Search Tutors</h1>
          <div className="wrap">
            <div className="search">
              <input
                type="text"
                className="searchTerm"
                placeholder="Which Subjects are you looking Tutor for?"
                onKeyUp={getTutor}
              />
              {/* <button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
              </button> */}
            </div>
          </div>
          <Tutors tutors={tutors.data} />
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default SearchTutorsPage;
