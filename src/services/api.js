import axios from "axios";
import { rutas } from "../Path";

const { SERVER_URL } = rutas;

const config = {
  headers: {
    'Content-Type': 'multipart/form-data;'
  }
};


export const doLogin = async (params) => {
  const [username, password] = params;

  const form = new FormData();

  form.append("username", username)
  form.append("password", password)

  const res = await axios.post(
    `${SERVER_URL}/user/login`,
    form,
    { config }      
  );

  return res.data;
};

export const doRegister = async (params) => {
  const [name, email, username, age, password, confirm_password] = params;

  const form = new FormData();

  form.append("name", name)
  form.append("email", email)
  form.append("username", username)
  form.append("age", age)
  form.append("password", password)
  form.append("confirm_password", confirm_password)

  const res = await axios.post(
    `${SERVER_URL}/user`,
    form,
    { config }
  );

  console.log(res);

  return res.data;
};

export const getAudioList = async (user_id) => {
  const res = await axios.get(`${SERVER_URL}/audio/${user_id}`);
  return res.data;
};

export const getAudioResult = async ({ params }) => {
  const { audio_id } = params;

  const res = await axios.get(`${SERVER_URL}/audio/results/${audio_id}`);

  console.log(res);

  return res.data;
};
