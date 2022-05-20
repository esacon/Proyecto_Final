import axios from "axios";
import { rutas } from "../Path";

const { SERVER_URL } = rutas;

export const doLogin = async (params) => {
  const [username, password] = params;

  const res = await axios.post(
    `https://thingproxy.freeboard.io/fetch/${SERVER_URL}/user/login`,
    { username, password }
  );

  console.log(res);

  return res.data;
};

export const doRegister = async (params) => {
  const [name, email, username, age, password, confirm_password] = params;

  const res = await axios.post(
    `https://thingproxy.freeboard.io/fetch/${SERVER_URL}/user`,
    {
      name,
      email,
      username,
      age,
      password,
      confirm_password,
    }
  );

  console.log(res);

  return res.data;
};

export const getAudioList = async ({ params }) => {
  const { user_id } = params;

  const res = await axios.post(`${SERVER_URL}/audio/`, { params: { user_id } });

  console.log(res);

  return res.data;
};

export const getAudioResult = async ({ params }) => {
  const { audio_id } = params;

  const res = await axios.post(`${SERVER_URL}/audio/results/`, {
    params: { audio_id },
  });

  console.log(res);

  return res.data;
};
