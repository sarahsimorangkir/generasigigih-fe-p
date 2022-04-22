import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "hooks/hooks";
import {
  retrieveUserId,
  createPlaylist,
  pushSongs,
} from "services/axios.service";
import { songUrisInterface } from "global/interfaces";
import {
  Center,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import Dialog from "components/Dialog";

const Form = ({ songUris }: songUrisInterface) => {
  const token = useAppSelector((state) => state.token.value);
  const [playlistId, setPlaylistId] = useState("");
  const [userId, setUserId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const toast = useToast();

  //run addSong function when playlistId is set
  useEffect(() => {
    const getUserId = () => {
      retrieveUserId(token)
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // add songs to the playlist
    const addSongs = () => {
      pushSongs(playlistId, songUris, token)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (playlistId) {
      addSongs();
    }
    getUserId();
  }, [playlistId, songUris, token]);

  // get the form data
  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.title.length >= 10) {
      createPlaylist(userId, form.title, form.description, token)
        .then((response) => {
          setPlaylistId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
        setDialogOpen(true);
      setForm({ title: "", description: "" });
    } else {
      toast({
        title: "Error",
        description: "Title must be at least 10 characters",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
    <Center>
      <Box w="sm">
        <form onSubmit={handleSubmit}>
          <FormControl mb="3">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              type="text"
              placeholder="Playlist Title"
              id="title"
              name="title"
              value={form.title}
              onChange={handleForm}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="title">Description</FormLabel>
            <Input
              type="text"
              placeholder="Playlist Description"
              id="description"
              name="description"
              value={form.description}
              onChange={handleForm}
            />
          </FormControl>
          <Button mt="3" w="100%" id="submit" type="submit" colorScheme="green">
            Create
          </Button>
        </form>
      </Box>
    </Center>
     <Dialog total={songUris.length} showConfirmation={dialogOpen} />
     </>
  );
};

export default Form;
