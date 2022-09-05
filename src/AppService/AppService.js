import Axios from "axios";

import API_URL from "./ApiURL";
import { authHeader } from "./AuthHeader";


//tager alle af det du kalder som parameter fx alle artister
//behøver ikke at stå i parantes fordi der kun er ét parameter
//jeg får en liste ud
const getAll = strEndPoint => {
  return Axios.get(`${API_URL}/${strEndPoint}`, {
    //tjekker om brugeren er logget ind, i tilfælde af at det er nødvendigt
    //den ignorerer det, hvis det ikke er nødvendigt
    headers: authHeader(),
  });
};

//fx appservice.get("artist", 25) = heinz 
const getDetails = (strEndPoint, id) => {
  return Axios.get(`${API_URL}/${strEndPoint}/${id}`, {
    headers: authHeader(),
  });
};

//her laver jeg fx en artist, hvor jeg sætter data(array af de informationer der skal bruges) ind
const create = (strEndPoint, data) => {
  return Axios.post(`${API_URL}/${strEndPoint}`, data, {
    headers: authHeader(),
  });
};

//hvis username og password er korrekte, så får jeg token tilbage = jeg er logget ind
const login = async (username, password) => {
  return await Axios.post(`https://api.mediehuset.net/token`, { username, password });
};

//den her kræver, at jeg er logget ind, for at kunne logge ud i endpointet
//den kræver at der er et logout i backenden
const logout = async () => {
  return await Axios.post(`${API_URL}/logout`, {
    headers: authHeader(),
  });
};

//fx en artist, med et bestemt id og med det data der skal ændres
const update = (strEndPoint, id, data) => {
  return Axios.put(`${API_URL}/${strEndPoint}/${id}`, data, {
    headers: authHeader(),
  });
};

//fx en artist med id 23 skal slettes
const remove = (strEndPoint, id) => {
  return Axios.delete(`${API_URL}/${strEndPoint}/${id}`, {
    headers: authHeader(),
  });
};

//eksporterer alle functions
const appService = {
  getAll,
  getDetails,
  create,
  update,
  remove,
  login,
  logout,
};

export default appService;
