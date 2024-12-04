import React from "react";
import Nevigation from "./components/Navigation";
import Head from "./components/Head";
import Section1 from "./components/Section1";
import Experience from "./components/Experience"
import Section2 from "./components/Section2";

function App() {
  return (
    <div className="App">
      <Nevigation />
      <Head />
      <Section1 />
      <Experience />
      <Section2 />
    </div>
  );
}

export default App;
