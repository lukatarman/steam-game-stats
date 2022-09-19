import Search from "./Search.js";
import "./app.css";

const App = () => {
  return (
    <div className="ui container">
      <div className=" main-card centered">
        <h1 className="title">Steam Game Stats</h1>
        <div style={{ backgroundColor: "black" }}>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default App;
