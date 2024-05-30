const config = {
  local: {
    DB: {
      HOST: "127.0.0.1",
      PORT: "27017",
      DATABASE: "healthcare",
      UserName: "",
      Password: "",
    },

    PORTNO: 5001,
  },

  staging: {
    DB: {
      HOST: "0.0.0.0",
      PORT: "27017",
      DATABASE: "healthcare",
      MONGOOSE: {
        useUndifinedTopology: true,
        useNewUrlParser: true,
      },
      UserName: "amitrai8489",
      Password: "kbWxlVfOJfgbYSjZ",
    },

    PORTNO: 5001,
  },
};
export const get = function get(env) {
  return config[env];
};
