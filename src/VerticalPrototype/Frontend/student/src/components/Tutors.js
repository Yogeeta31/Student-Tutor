import TutorItem from "./TutorItem";
import classes from "./Tutors.module.css";

function Tutors(props) {
  return (
    <ul className={classes.list}>
      {props.tutors.map((tutor) => (
        <TutorItem
          key={tutor.id}
          id={tutor.id}
          image={tutor.image}
          name={tutor.name}
          subjects={tutor.subjects}
          ratings={tutor.ratings}
          title={tutor.title}
        />
      ))}
    </ul>
  );
}

export default Tutors;
