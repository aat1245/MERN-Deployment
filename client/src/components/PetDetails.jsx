import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import myStyles from "./styles.module.css";

const linkStyle = {
  justifyContent: "end",
  display: "flex",
  margin: "20px",
};

const PetDetails = (props) => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const history = useHistory();
  const [like, setLike] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + id)
      .then((res) => setPet(res.data))
      .catch((err) => console.error(err));
  }, []);

  function handleDelete(pet) {
    axios.delete("http://localhost:8000/api/pets/" + pet._id).then((res) => {
      history.push("/");
    });
  }

  function handleLike(like) {
    setLike(like + 1);
  }

  return (
    <div className={myStyles.container}>
      <h1 className={myStyles.base}>Pet Shelter</h1>
      <Link style={linkStyle} to="/">
        back to home
      </Link>
      <div className={myStyles.tow}>
        <h4 className={myStyles.base}>Details About {pet.name}</h4>
        <button id={myStyles.del} onClick={(event) => handleDelete(pet)}>
          Adopt {pet.name}
        </button>
      </div>
      <div className={myStyles.form}>
        <h3 className={myStyles.base}>Pet Type: {pet.type}</h3>
        <p className={myStyles.info}>Description: {pet.description}</p>
        <h3 className={myStyles.base}> Skills:</h3>
        <ul className={myStyles.info}>
          <li>{pet.skill1}</li>
          <li>{pet.skill2}</li>
          <li>{pet.skill3}</li>
        </ul>
        <div>
          <p>
            {" "}
            <button id={myStyles.submit} onClick={() => handleLike(like)}>
              Like
            </button>
            &nbsp;&nbsp; {like} Likes
          </p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
