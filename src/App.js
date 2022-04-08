import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import CreatePlaylist from "./pages/CreatePlaylist";
import Login from "./pages/Login";

function App() {
  const token = useSelector((state) => state.token.value);

  return (
    <div className="p-5 bg-gray-900 h-screen space-y-5 overflow-auto">
      <Router>
        <Switch>
          <Route exact path="/">
            {!token ? <Login /> : <Redirect to="/create-playlist" />}
          </Route>
          <Route path="/create-playlist">
            <CreatePlaylist />
          </Route>
          <Route path="*">
            <h3>404</h3>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
