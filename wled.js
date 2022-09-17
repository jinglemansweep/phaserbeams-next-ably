require("dotenv").config();

const Ably = require("ably");

const ablyClient = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY);

const channel = ablyClient.channels.get("game");

const states = {};

channel.subscribe((message) => {
  //console.log({ message });
  if (message.name === "state") {
    states[message.clientId] = message.data;
  }
  console.log({ states });
});
