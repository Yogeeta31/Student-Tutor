import Card from "../ui/Card";
import classes from "./TutorItem.module.css";

function TutorItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <p>Subjects:- {props.subjects}</p>
          <p>Rating:- {props.ratings}</p>
        </div>
        <div className={classes.actions}>
          <button>View Profile</button>
        </div>
      </Card>
    </li>
  );
}

export default TutorItem;
