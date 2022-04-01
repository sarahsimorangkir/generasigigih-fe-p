import React, { useEffect, useState } from "react";
//import { ALBUM_ITEM } from "../../constants";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import url from "../../helper/spotify";
import axios from "axios";

const Playlist = () => {
  const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);

  //get token from url
  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setToken(accessToken);
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
        <PlaylistItem
          key={uri}
          uri={uri}
          img={album.images[0].url}
          title={title}
          album={album.name}
          artists={artists}
          selectedState = {handleSelect}
          isSelected = {isSelected}
        />
      </div>
    );
  });
};

export default Playlist;
