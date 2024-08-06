import "./App.css";
import JobListing from "./components/JobListing";

function App() {
  return (
    <div className="bg-cyan-100 w-full h-full">
      <img
        src="/assets/images/header.svg"
        alt="header"
        className="bg-cyan-500 w-full"
      />
      <JobListing />
    </div>
  );
}

export default App;
