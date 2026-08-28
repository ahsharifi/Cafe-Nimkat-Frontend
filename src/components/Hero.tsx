import Logo from "../assets/imgs/Logo.jpeg";
import { Coffee } from "lucide-react";

function Hero() {
  function handleClick() {
    location.href = "#menu";
  }
  return (
    <div className="hero">
      <div className="container mx-auto w-[90%] min-h-screen flex flex-col items-center justify-center gap-2 md:gap-4">
        <img
          src={Logo}
          alt="کافه نیمکت"
          className="w-30 md:w-40 aspect-square rounded-full mb-8 outline-2 outline-offset-3 outline-primary"
        />
        <div className="text-4xl md:text-6xl flex flex-row items-center justify-center gap-2 mb-2">
          <h2>منو مجازی کافه</h2>
          <h1>نیمکت</h1>
        </div>
        <p className="text-3xl text-center md:text-4xl">
          یه نیمکت، یه فنجون قهوه، و یه عالمه حالِ خوب؛ اینجا کافه نیمکته.
        </p>
        <p className="text-2xl text-center md:text-3xl mb-5 md:mb-3">
          بشین، انتخاب کن، نوش جان ☕
        </p>
        <button
          className="btn-primary text-xl px-6 py-2 flex flex-row items-center gap-2"
          onClick={handleClick}
        >
          منو رو ببین
          <Coffee />
        </button>
        <p className="text-xl">قول می‌دیم انتخاب سختی نباشه :)</p>
      </div>
    </div>
  );
}

export default Hero;
