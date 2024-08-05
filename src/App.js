import "./App.css";
import JobListing from "./components/JobListing";
import header from "./assets/images/header.svg";

function App() {
  return (
    <div className="bg-cyan-100 w-screen h-screen">
      <img src={header} alt="header" className="bg-cyan-500" />
      <JobListing />
    </div>
  );
}

export default App;
