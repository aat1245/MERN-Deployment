import React, { useState } from "react";
import axios from "axios";
import myStyles from "./styles.module.css";
import { Link, useHistory } from "react-router-dom";

const linkStyle = {
  justifyContent: "end",
  display: "flex",
  margin: "20px",
};

const PetForm = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skill1, setSkill1] = useState("");
  const [skill2, setSkill2] = useState("");
  const [skill3, setSkill3] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const onSubmitHandler = (e) => {
    //prevent default behavior of the submit
    e.preventDefault();
    //make a post request to create a new product
    axios
      .post("http://localhost:8000/api/pets/new", {
        name,
        type,
        description,
        skill1,
        skill2,
        skill3,
      })
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => {
        const data = err.response.data;
        console.log(data);
        const errorMessages = [];
        if ("errors" in data) {
          for (let field in data.errors) {
            const validationError = data.errors[field];
            errorMessages.push(validationError.message);
          }
        }
        setErrors(errorMessages);
      });
  };

  return (
    <div className={myStyles.container}>
      <h1 className={myStyles.base}>Pet Shelter</h1>
      <Link to={"/"} style={linkStyle}>
        back to home
      </Link>
      <h4 className={myStyles.base}> Know a pet needing a home?</h4>
      {errors.map((errorMessage, index) => (
        <ul key={index} className={myStyles.err}>
          Error:
          <li>{errorMessage}</li>
        </ul>
      ))}
      <form onSubmit={onSubmitHandler} className={myStyles.form}>
        <div className="row">
          <div className="col">
            <p>
              Pet Name:
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </p>
            <p>
              Pet Type:
              <input
                type="text"
                onChange={(e) => setType(e.target.value)}
                value={type}
              />
            </p>
            <p>
              Pet Description:
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </p>
          </div>
          <div className="col">
            <div>
              <label>Skills (Optional):</label>
            </div>
            <div>
              <label>Skill 1:</label>
              <input
                onChange={(e) => setSkill1(e.target.value)}
                value={skill1}
                type="text"
              />
            </div>
            <div>
              <label>Skill 2:</label>
              <input
                onChange={(e) => setSkill2(e.target.value)}
                value={skill2}
                type="text"
              />
            </div>
            <div>
              <label>Skill 3:</label>
              <input
                onChange={(e) => setSkill3(e.target.value)}
                value={skill3}
                type="text"
              />
            </div>
          </div>
        </div>
        <button type="submit" id={myStyles.btn}>
          Add Pet
        </button>
      </form>
    </div>
  );
};

export default PetForm;
