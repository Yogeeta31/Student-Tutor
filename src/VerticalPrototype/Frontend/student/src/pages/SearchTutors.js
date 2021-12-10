import Tutors from "../components/Tutors";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";

function SearchTutorsPage() {
  const [tutors, setTutors] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:4000/api/tutors/get").then((result) => {
      for (let i = 0; i < result.data.length; i++) {
        result.data[i].image =
        "https://www.facebeautyscience.com/wp-content/uploads/2020/04/face-beauty-skin-face2-proc.jpg";
      }
      setTutors(result);
    });
  }, []);
  return (
    <section>
      {tutors ? (
        <div>
          <h1>Search Tutors</h1>
          <Tutors tutors={tutors.data} />
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default SearchTutorsPage;
