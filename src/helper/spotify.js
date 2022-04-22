var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
var redirect_uri =process.env.REACT_APP_LOCAL_URL  || process.env.REACT_APP_SPOTIFY_API_BASE_URL;

var state = "SARAHSIMORANGKIR";

localStorage.setItem("TOKEN", state);
var scope = "playlist-modify-private user-read-private";

var url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
url += "&state=" + encodeURIComponent(state);

export default url;
