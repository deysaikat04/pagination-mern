import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Signin from "./components/Signin";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => <Signin {...props} />} />
        <Route exact path="/signup" render={(props) => <Signup {...props} />} />
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route exact path="/upload" render={(props) => <FileUpload {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
