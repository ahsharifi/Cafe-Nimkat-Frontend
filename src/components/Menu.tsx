import Coffee from "../assets/icons/coffee.png";
import ColdCoffee from "../assets/icons/cold-coffee.png";
import HotDrink from "../assets/icons/hot-drink.png";
import Tea from "../assets/icons/tea.png";
import MilkShake from "../assets/icons/milk-shake.png";
import ColdDrink from "../assets/icons/cold-drink.png";
import Cake from "../assets/icons/cake.png";
import Food from "../assets/icons/food.png";
import IceCream from "../assets/icons/ice-cream.png";
import MenuCatrgory from "./MenuCatrgory";

function Menu() {
  return (
    <div className="menu min-h-screen" id="menu">
      <div className="container mx-auto w-[90%] min-h-screen flex flex-col items-center py-15 gap-2 md:gap-4">
        <div className="title">
          <h1 className="text-4xl mb-10">امروز چی می چسبه؟</h1>
          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <MenuCatrgory
            icon={Coffee}
            title="اسپرسوبار"
            description={["اسپرسو", "ترک", "کاپوچینو"]}
          />
          <MenuCatrgory
            icon={ColdCoffee}
            title="کلد کافی"
            description={["آفوگاتو", "آیس لاته"]}
          />
          <MenuCatrgory
            icon={HotDrink}
            title="نوشیدنی گرم"
            description={["شیربیسکوئیت", "هات چاکلت"]}
          />
          <MenuCatrgory
            icon={Tea}
            title="چای"
            description={["ماسالا", "هل", "دارچین"]}
          />
          <MenuCatrgory
            icon={MilkShake}
            title="میلک شیک"
            description={["شکلاتی", "نوتلا", "شیک پسته"]}
          />
          <MenuCatrgory
            icon={ColdDrink}
            title="نوشیدنی سرد"
            description={["موهیتو", "پینک", "شیرموز"]}
          />
          <MenuCatrgory
            icon={Cake}
            title="کیک و دسر"
            description={["وافل نوتلا", "چیزکیک", "ترامیسو"]}
          />
          <MenuCatrgory
            icon={Food}
            title="غذا و سالاد"
            description={["پاستا آلفردو", "ذرت مکزیکی"]}
          />
          <MenuCatrgory
            icon={IceCream}
            title="بستنی"
            description={["شکلاتی", "توت فرنگی", "گردویی"]}
          />
          <MenuCatrgory
            icon={Coffee}
            title="دمنوش"
            description={["آرامبخش", "ضدسرماخوردگی"]}
          />
        </ul>
      </div>
    </div>
  );
}

export default Menu;
