import React from "react";
import data from "../../data";
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";

const Playlist = () => {
  const { album, name: title, artists } = data;
  return (
    <div className="playlist">
      <PlaylistItem
        img={album.images[0].url}
        title={title}
        album={album.name}
        artists={artists}
      />
    </div>
  );
};

export default Playlist;
