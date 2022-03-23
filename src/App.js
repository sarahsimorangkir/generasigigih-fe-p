import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data"

const img = data.album.images[0].url
const title = data.name
const artist = data.album.artists[0].name
function App() {
  return (
    <div className="App" >
      <div class="title"> My Playlist <span>.</span></div>
      <img src={img} className="App-logo img" alt={title}/>
      <h2>{title}</h2>
      <p>Artist : {artist}</p>
      <button className='btn btn-primary'>Select</button>
    </div>
  );
}

export default App;
