export const authHeader = () => {
  //Henter sessionStorage hvis den eksisterer
  const currentToken = sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : "";

  //Hvis den eksisterer, så sætter jeg token i en auth header
  if (currentToken) {
    return {
      //alle api'er og domæner kan tilgå den her (* = asterisk)
      //den skal stå i gåseøjne, fordi den har bindestreg, ellers minuser den
      "Access-Control-Allow-Origin": "*", //cors!!
      "Authorization": `Bearer ${currentToken.access_token}`,
    };
  } else {
    return {};
  }
}
