import Search from "./Search.js";
import "./app.css";

const App = () => {
  return (
    <div className="container main-card centered">
      <h1 className="title">Steam Game Stats</h1>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default App;
