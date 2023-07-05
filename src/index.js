import React from "react"; // Importing the React library
import ReactDOM from "react-dom/client"; // Importing the ReactDOM library
import "./index.css"; // Importing a CSS file
import App from "./App"; // Importing the App component

// Creating a React root element and specifying the target DOM element with the id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component inside the root element
root.render(
  <React.StrictMode> {/* Wrapping the App component with React.StrictMode */}
    <App /> {/* Rendering the App component */}
  </React.StrictMode>
);
