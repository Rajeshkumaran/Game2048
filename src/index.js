import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
// const initialState = window.initialState;
ReactDOM.hydrate(<App />, document.getElementById("root"));
