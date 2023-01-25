import About from "./components/About";
import Buttons from "./components/Buttons";
import Footer from "./components/Footer";
import Image from "./components/Image";
import Interests from "./components/Interest";
import Name from "./components/Name";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Image />
      <Name />
      <Buttons />
      <About />
      <Interests />
      <Footer />
    </div>
  );
}

export default App;
