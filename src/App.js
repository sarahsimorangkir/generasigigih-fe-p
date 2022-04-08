import data from './data-sample';
import Song from './components/Song'

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
       <Song
        title={data.name}
        image={data.album.images[0].url}
        album={data.artists[0].name}
      />
    </div>
  );
}

export default App;
