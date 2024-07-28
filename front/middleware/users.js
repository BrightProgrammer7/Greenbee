import axios from "axios";
const Cookie = require("js-cookie");

export default function ({ store, redirect }) {
  if (!store.state.auth) {
    return redirect("/");
  } else {
    return new Promise((resolve) => {
      axios
        .post(
          process.env.api_uri + "/checkRoute",
          {},
          {
            headers: { Authorization: store.state.auth.token },
          }
        )
        .then(function (response) {
          store.commit("setAuth", response.data);
          resolve();
        })
        .catch(() => {
          Cookie.remove("auth"); // saving token in cookie for server rendering
          store.commit("setAuth", null);
          resolve(redirect("/"));
        });
    });
  }
}
