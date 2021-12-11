import TutorItem from "./TutorItem";
import classes from "./Tutors.module.css";

function Tutors(props) {
  return (
    <ul className={classes.list}>
      {props.tutors.map((tutor) => (
        <TutorItem
          key={tutor.TUTOR_ID}
          id={tutor.TUTOR_ID}
          image={tutor.image}
          name={tutor.FIRST_NAME + " " + tutor.LAST_NAME}
          subjects={tutor.SUBJECT_ID}
          price={tutor.PRICE}
        />
      ))}
    </ul>
  );
}

export default Tutors;
