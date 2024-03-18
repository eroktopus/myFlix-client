import { createRoot } from "react-dom/client";

import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

import "./index.scss";

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);















// import React from 'react';
// import ReactDOM from 'react-dom';
// import { MainView } from './components/main-view/main-view';
// import './index.scss'; // Import your SCSS file here

// const App = () => {
//   return <MainView />;
// };

// // Finds the root of your app
// const container = document.querySelector("#root");

// // Tells React to render your app in the root DOM element
// ReactDOM.render(<App />, container);

