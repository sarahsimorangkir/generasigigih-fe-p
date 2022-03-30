import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Playlist from "./components/Playlist/Playlist";

function App() {
  return (
    <div className="App">
      <h1 className="title">
        My Playlist <span>.</span>
      </h1>
      <Playlist />
    </div>
  );
}

export default App;
