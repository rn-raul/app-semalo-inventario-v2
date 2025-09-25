import axios from "axios";

const api = axios.create({
  baseURL: "https://snkbrp01742.ativy.com/mge",
});
export default api;