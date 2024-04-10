import MyComponent from "./assets/components/MyComponent.jsx";
import React from "react";

const App = () => {
  return (
    <div>
      <h1>Pagination Example</h1>
      <MyComponent apiUrl="https://jsonplaceholder.org/users" />
    </div>
  );
};

export default App;
