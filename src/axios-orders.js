import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-76c44.firebaseio.com/",
});

export default instance;
