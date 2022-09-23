import SgsNavbar from "./SgsNavbar.js";
import "./app.css";

const App = () => {
  return (
    <div>
      <SgsNavbar fixed="top" includeSearch={true} />
    </div>
  );
};

export default App;
