import { React, useEffect, useState } from "react";
import { createPlaylist, pushSongs } from "../../services/axios.service";

const CreatePlaylist = ({ token, userId, songUris }) => {
  const [playlistId, setPlaylistId] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  // run addSong function when playlistId is set
  useEffect(() => {
    if (playlistId) {
      addSongs();
    }
  }, [playlistId]);

  // get the form data
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title.length > 10) {
      await createPlaylist(userId, form.title, form.description)
        .then((response) => {
          setPlaylistId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });

      setForm({ title: "", description: "" });
      alert("Successfully created playlist");
    } else {
      alert("Title must be more than 10 characters");
    }
  };

  // add songs to playlist
  const addSongs = async () => {
    pushSongs(playlistId, songUris)
      .then((response) => {
        console.log(response);
      })
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="title-create">Create Playlist</h2>
      <ul className="list">
        <li>
          <label htmlFor="title">Title Playlist</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={handleForm}
          />
        </li>
        <li>
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="Description"
            name="description"
            value={form.des}
            onChange={handleForm}
          ></textarea>
        </li>
      </ul>
      <button id="submit" type="submit" className="btn-create">
        Create
      </button>
    </form>
  );
};

export default CreatePlaylist;
