import React, { useEffect, useState } from "react";
//import { ALBUM_ITEM } from "../../constants";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";
import url from "../../helper/spotify";
import axios from "axios";

const Playlist = () => {
  const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    setToken(accessToken);
  }, []);

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

  return songData.map((song) => {
    const { id, album, name: title, artists } = song;

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
          key={id}
          img={album.images[0].url}
          title={title}
          album={album.name}
          artists={artists}
        />
      </div>
    );
  });
};

export default Playlist;
