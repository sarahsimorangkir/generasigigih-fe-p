import React from "react";

export const PlaylistItem = ({ img, title, artists, album }) => {
  return (
    <>
      <div className=" card playlist-item">
        <img className=" img " src={img} alt={title} />
        <div className="playlist-content">
          <h3>{title}</h3>
          <p>{artists.map((artist) => artist.name)}</p>
          <p>Album : {album}</p>
          <button className="btn btn-primary">Select</button>
        </div>
      </div>
    </>
  );
};
