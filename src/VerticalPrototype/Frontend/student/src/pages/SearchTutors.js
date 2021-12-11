import Tutors from "../components/Tutors";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";

const DUMMY_DATA = [
  {
    id: 0,
    name: "Johnny",
    image:
      "https://www.facebeautyscience.com/wp-content/uploads/2020/04/face-beauty-skin-face2-proc.jpg",
    subjects: "Maths",
    ratings: 5,
  },
  {
    id: 1,
    name: "English",
    image:
      "https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg",
    subjects: "Science",
    ratings: 4.5,
  },
];

function SearchTutorsPage() {
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((result) => {
      setTodos(result.data);
      console.log(result.data);
      for (let i = 0; i < DUMMY_DATA.length; i++) {
        DUMMY_DATA[i].title = result.data[0].title;
      }
    });
  }, []);
  return (
    <section>
      {todos ? (
        <div>
          <h1>Search Tutors</h1>
          <Tutors tutors={DUMMY_DATA} />
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default SearchTutorsPage;
