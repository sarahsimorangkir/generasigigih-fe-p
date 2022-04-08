import { useEffect, useState } from "react";
import Song from "./components/Song";
import axios from "axios";
import url from "./helper/spotify";
import CreatePlaylist from "./components/CreatePlaylist";
import Search from "./components/Search";

function App() {
  const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    const getUserId = () => {
      axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserId();
    setToken(accessToken);
  }, []);

  //pass songData for combineSong and add isSelected
  useEffect(() => {
    const handleCombineTracks = songData.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
  }, [songData, selectedSongs]);

  //get song data from spotify
  const getSong = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`
      )
      .then((response) => {
        setSongData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handle select state of the songs
  const handleSelect = (uri) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
  };

  return (
    <div className="p-5 bg-gray-900 h-screen space-y-5 overflow-auto">
      <div className="text-center">
        <h2 className="text-white text-3xl mb-5 font-semibold">
          Create Playlist
        </h2>
        <a
          href={url}
          className="py-2 px-4 bg-blue-600 rounded text-white font-medium uppercase hover:bg-blue-700 text-xs leading-tight"
        >
          Login
        </a>
      </div>
      <div>
        <Search getSong={getSong} setSearchSong={setSearchSong} />
      <div>
        <CreatePlaylist
          token={token}
          userId={userId}
          songUris={selectedSongs}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {combineSongs.map((song) => {
          const { uri, name, artists, album, isSelected } = song;
          return (
            <Song
              key={uri}
              uri={uri}
              image={album.images[0]?.url}
              title={name}
              album={artists[0]?.name}
              selectState={handleSelect}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default App;
