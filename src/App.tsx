import { useState } from "react";
import "./App.css";
import Stat from "./Stat";
import { falvinoids, gamma } from "./calculate";

function App() {
  let data: any[];            //Iniialization
  let gammadata:any[];
  const [showgamma,setgamma] = useState(false);
  data = falvinoids();    //Storing the desired results
  gammadata = gamma();
  function clickHandler(){    //Helper function for handling the click even of Show/Hide Button
    setgamma(!showgamma);
  }
  return (
    <>
      <Stat data={data} title="Flavanoids"/>
      <button onClick={clickHandler} className="button">{!showgamma ? "Show Gamma": "Hide Gamma"}</button>
      <span></span>
      {showgamma ? <Stat data={gammadata} title="Gamma" /> : <div></div>}
    </>
  );
}

export default App;
