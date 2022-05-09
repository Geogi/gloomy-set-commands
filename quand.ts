import fetch from "node-fetch";
import { application_secret } from "./secrets.js";

const application_id = "971380719710507018";
const url_token = `https://discord.com/api/v9/oauth2/token`;
const payload_params = new URLSearchParams();
payload_params.append("grant_type", "client_credentials");
payload_params.append("scope", "applications.commands.update");
const auth = Buffer.from(application_id + ":" + application_secret).toString("base64");
const headers_token = {
  content_type: "application/x-www-form-urlencoded",
  authorization: `basic ${auth}`,
};
const response_token: any = await (
  await fetch(url_token, {
    method: "post",
    headers: headers_token,
    body: payload_params,
  })
).json();
console.log(response_token);
const access_token = response_token.access_token;
const guild_id_ytp = "455833075448807425";
const url =
  `https://discord.com/api/v9/applications/` +
  `${application_id}/guilds/${guild_id_ytp}/commands`;
const payload = {
  name: "quand",
  description: "Sondage pour déterminer la date d’un événement",
  type: 1,
  options: [
    {
      name: "titre",
      description: "Titre de l’événement",
      type: 3,
      required: true,
    },
    {
      name: "rôle",
      description: "Rôle dont les membres sont concernés",
      type: 8,
    },
  ],
};
console.log(JSON.stringify(payload));
const headers = {
  "content-type": "application/json",
  authorization: `Bearer ${access_token}`,
};
const response = await fetch(url, {
  method: "post",
  headers,
  body: JSON.stringify(payload),
});
console.log(response);
