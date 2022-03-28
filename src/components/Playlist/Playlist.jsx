import React from "react";
import {ALBUM_ITEM} from "../../constants"
import { PlaylistItem } from "../PlaylistItem/PlaylistItem";

const Playlist = () => {
  return ALBUM_ITEM.map((item) => {
    const { album, name: title, artists } = item;
 
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
});
};

export default Playlist;
