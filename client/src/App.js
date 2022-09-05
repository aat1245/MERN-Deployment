import PetForm from "./components/PetForm";
import Pets from "./components/Pets";
import PetDetails from "./components/PetDetails";
import UpdatePet from "./components/updatePet";

import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Pets />
        </Route>
        <Route exact path="/new">
          <PetForm />
        </Route>
        <Route exact path="/:id">
          <PetDetails />
        </Route>
        <Route exact path="/:id/edit">
          <UpdatePet />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
