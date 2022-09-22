import Navbar from "./Navbar.js";
import "./app.css";

const App = () => {
  return (
    <div>
      <Navbar fixed="top" includeSearch={true} />
    </div>
  );
};

export default App;
