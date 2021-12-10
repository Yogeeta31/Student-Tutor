import Tutors from "../components/Tutors";

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
  return (
    <section>
      <h1>Search Tutors</h1>
      <Tutors tutors={DUMMY_DATA} />
    </section>
  );
}

export default SearchTutorsPage;
