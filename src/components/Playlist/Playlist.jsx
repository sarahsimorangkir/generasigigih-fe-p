import React, { useEffect, useState } from "react";
//import { ALBUM_ITEM } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "./reducer/tokenSlice";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import url from "../../helper/spotify";
import {
  getToken,
  retrieveSongs,
  retrieveUserId,
} from "./services/axios.service";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";

const Playlist = () => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);
  const [userId, setUserId] = useState("");

  //get token from url
  useEffect(() => {
    getUserId();
    dispatch(setToken(getToken()));
  }, []);

  //passing songData to combineSong n add isSelected to combineSong
  useEffect(() => {
    const handleCombineTracks = songData.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
  }, [songData, selectedSongs]);

  //get song data from spotify
  const getSong = () => {
    retrieveSongs(searchSong).then((response) => {
      setSongData(response.data.tracks.items);
    });
  };

  const getUserId = () => {
    retrieveUserId().then((response) => {
      setUserId(response.data.id);
    });
  };

  //handle the select state of the song
  const handleSelect = (uri) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
  };

  return combineSongs.map((song) => {
    const { uri, album, name: title, artists, isSelected } = song;
    console.log(songData);

    return (
      <div className="playlist">
        <h2 className="title"> Create Playlist </h2>
        <a className="link-login" href={url}>
          Login
        </a>
        <div className="input-search">
          <input
            type="search"
            className="form-group"
            placeholder="Search Here..."
            onChange={(e) => setSearchSong(e.target.value)}
          />
          <button
            type="submit"
            id="btn-search"
            className="btn btn-primary"
            onClick={getSong}
          >
            Search
          </button>
        </div>
        <div>
          <CreatePlaylist
            token={token}
            userId={userId}
            songUris={selectedSongs}
          />
        </div>
        <PlaylistItem
          key={uri}
          uri={uri}
          img={album.images[0].url}
          title={title}
          album={album.name}
          artists={artists}
          selectedState={handleSelect}
          isSelected={isSelected}
        />
      </div>
    );
  });
};

export default Playlist;
