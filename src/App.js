import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data"

const img = data.album.images[0].url
const title = data.name
const artist = data.album.artists[0].name
function App() {
  return (
    <div className="App" >
      <img src={img} className="App-logo img" alt={title}/>
      <h1>{title}</h1>
      <p>Artist : {artist}</p>
      <button className='btn btn-primary'>Select</button>
    </div>
  );
}

export default App;
