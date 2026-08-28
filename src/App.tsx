import { useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Lenis from "lenis";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return (
    <>
      <Hero />
      <Menu />
    </>
  );
}

export default App;
