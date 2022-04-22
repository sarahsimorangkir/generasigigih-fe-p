import { useEffect } from "react";
import { setToken } from "reducer/tokenSlice";
import { useAppDispatch } from "hooks/hooks";
import url from "helper/spotify";
import logo from "assets/logo-spotify.png";
import { Center, Image, Link, Box, Text } from "@chakra-ui/react";

const Login = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setToken(getToken() || ""));
  }, [dispatch]);

  const getToken = () => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");

    return accessToken;
  };

  return (
    <>
      <Center h="100vh">
        <Box p="20" boxSize="350px" bgColor="gray.700" borderRadius="md">
          <Box>
            <Image boxSize="120px" m="0 auto" src={logo} alt="Spotify Logo" />
            <Text fontSize="3xl" textAlign="center" color="white">
              Spotify
            </Text>
          </Box>
          <Box pt="6">
            <Center>
              <Link
                href={url}
                py="2"
                px="4"
                bgColor="green.500"
                borderRadius="md"
                color="white"
              >
                Login
              </Link>
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default Login;