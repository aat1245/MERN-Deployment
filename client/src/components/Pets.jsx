import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import myStyles from "./styles.module.css";

const linkStyle = {
  justifyContent: "end",
  display: "flex",
  margin: "20px",
};

function Pets(props) {
  const [petsList, setPetsList] = React.useState([]);
  const [isLoaded, setLoaded] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    console.log("UseEffect running now");
    axios.get("http://localhost:8000/api/pets").then((response) => {
      console.log(response);
      setPetsList(response.data);
      setLoaded(true);
    });
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1 className={myStyles.base}>Pet Shelter</h1>
          <Link to="/new" style={linkStyle}>
            Add a Pet to the Shelter
          </Link>
          <h4 className={myStyles.base}>
            {" "}
            These pets are looking for a good home
          </h4>
          <br></br>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {petsList.map((pet, index) => (
                <tr key={index}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>
                    <Link to={`/${pet._id}`}>details</Link> &nbsp;&nbsp;|
                    &nbsp;&nbsp;
                    <Link to={`/${pet._id}/edit`}>edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Pets;
