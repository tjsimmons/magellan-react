import React, { useState } from "react";
import Users from "./Users";
import Home from "./Home";
import Nav from "./Nav";
import { Route } from "react-router-dom";
import ManageUser from "./Users/ManageUser";
import { Snackbar } from "@material-ui/core";

const App = () => {
  const [snackbar, setSnackbar] = useState(null);

  const closeSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <>
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          open
          autoHideDuration={3000}
          onClose={closeSnackbar}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top"
          }}
          transitionDuration={500}
        />
      )}
      <Nav />
      <Route exact path="/">
        <Home />
      </Route>
      <Route
        path="/users"
        render={reactRouterProps => <Users {...reactRouterProps} />}
      />
      <Route path="/user">
        <ManageUser setSnackbar={setSnackbar} />
      </Route>
    </>
  );
};

export default App;
