import Logo from "../assets/imgs/Logo.jpeg";
import Wave from "../assets/imgs/wave.png";
import { Coffee } from "lucide-react";

function Hero() {
  function handleClick() {
    location.href = "#menu";
  }
  return (
    <div className="relative">
      <div className="hero">
        <div className="container mx-auto w-[90%] min-h-screen flex flex-col items-center justify-center gap-2 md:gap-4">
          <img
            src={Logo}
            alt="کافه نیمکت"
            className="w-30 md:w-40 aspect-square rounded-full mb-8 outline-2 outline-offset-3 outline-primary"
          />
          <div className="text-4xl md:text-6xl flex flex-row items-center justify-center gap-2 mb-2">
            <h2>منوی مجازی کافه</h2>
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
      <div className="hero-bottom">
        <img src={Wave} alt="" className="wave" />
      </div>
      <svg
        className="arrow"
        width="180"
        viewBox="0 0 100 180"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="
      M50 5
      C75 15, 82 38, 65 52
      C48 66, 22 58, 25 38
      C28 20, 55 18, 65 32
      C76 47, 68 68, 52 76
      C36 84, 25 98, 34 113
      C43 128, 65 126, 67 111
      C69 98, 51 92, 43 101
      C34 111, 40 126, 52 134
      C61 140, 66 148, 66 158
    "
          fill="none"
          stroke="#DCCB94"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-dasharray="4 6"
        />

        <path
          d="
      M57 151
      C60 155, 63 160, 66 166
      C69 161, 73 157, 78 155
    "
          fill="none"
          stroke="#DCCB94"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
}

export default Hero;
