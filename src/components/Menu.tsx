import Coffee from "../assets/icons/coffee.png";
import ColdCoffee from "../assets/icons/cold-coffee.png";
import HotDrink from "../assets/icons/hot-drink.png";
import Tea from "../assets/icons/tea.png";
import MilkShake from "../assets/icons/milk-shake.png";
import ColdDrink from "../assets/icons/cold-drink.png";
import Cake from "../assets/icons/cake.png";
import Food from "../assets/icons/food.png";
import IceCream from "../assets/icons/ice-cream.png";
import MenuItem from "./MenuItem";

function Menu() {
  return (
    <div className="menu min-h-screen" id="menu">
      <div className="container mx-auto w-[90%] min-h-screen flex flex-col items-center py-15 gap-2 md:gap-4">
        <h1 className="text-4xl mb-10">امروز چی می چسبه؟</h1>
        <ul className="w-full grid grid-cols-5 gap-5">
          <MenuItem
            icon={Coffee}
            title="اسپرسوبار"
            description={["اسپرسو", "ترک", "کاپوچینو"]}
          />
          <MenuItem
            icon={ColdCoffee}
            title="کلد کافی"
            description={["آفوگاتو", "آیس لاته"]}
          />
          <MenuItem
            icon={HotDrink}
            title="نوشیدنی گرم"
            description={["شیربیسکوئیت", "هات چاکلت"]}
          />
          <MenuItem
            icon={Tea}
            title="چای"
            description={["ماسالا", "هل", "دارچین"]}
          />
          <MenuItem
            icon={MilkShake}
            title="میلک شیک"
            description={["شکلاتی", "نوتلا", "شیک پسته"]}
          />
          <MenuItem
            icon={ColdDrink}
            title="نوشیدنی سرد"
            description={["موهیتو", "پینک", "شیرموز"]}
          />
          <MenuItem
            icon={Cake}
            title="کیک و دسر"
            description={["وافل نوتلا", "چیزکیک", "ترامیسو"]}
          />
          <MenuItem
            icon={Food}
            title="غذا و سالاد"
            description={["پاستا آلفردو", "ذرت مکزیکی"]}
          />
          <MenuItem
            icon={IceCream}
            title="بستنی"
            description={["شکلاتی", "توت فرنگی", "گردویی"]}
          />
          <MenuItem
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
