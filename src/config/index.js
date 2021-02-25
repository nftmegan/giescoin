const dotenv = require("dotenv");

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const stringToBool = (str) => {
  if(str == "true")
    return true;
  return false;
}

module.exports = {
  "port": parseInt(process.env.PORT, 10),
  "api": {
    prefix: process.env.API_PATH,
  },
  "debug": stringToBool(process.env.DEBUG),
  "listen_to_peers": stringToBool(process.env.LISTEN_TO_PEERS)
};