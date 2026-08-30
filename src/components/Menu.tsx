import Coffee from "../assets/icons/coffee.png";
import ColdCoffee from "../assets/icons/cold-coffee.png";
import HotDrink from "../assets/icons/hot-drink.png";
import Tea from "../assets/icons/tea.png";
import MilkShake from "../assets/icons/milk-shake.png";
import ColdDrink from "../assets/icons/cold-drink.png";
import Cake from "../assets/icons/cake.png";
import Food from "../assets/icons/food.png";
import IceCream from "../assets/icons/ice-cream.png";
import MenuCategory from "./MenuCategory";
import { useState } from "react";

interface ItemsData {
  name: string;
  category: string;
  price: number;
  status: boolean;
}

function Menu() {
  const data: ItemsData[] = [
    {
      name: "اسپرسو",
      category: "اسپرسوبار",
      price: 0,
      status: true,
    },
    {
      name: "آفوگاتو",
      category: "کلد کافی",
      price: 0,
      status: true,
    },
  ];

  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleClickPopover(selectedCategory: string) {
    setCategory(selectedCategory);
    setIsOpen(true);
  }

  function closePopover() {
    setIsOpen(false);
    setCategory("");
  }

  const filteredItems = data.filter((item) => item.category === category);

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
        {isOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
            <div className="relative w-[90%] max-w-md p-8 bg-white border border-gray-300 shadow-xl rounded-xl flex flex-col items-center z-50">
              <button
                onClick={closePopover}
                className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

              <h3 className="text-2xl border-b border-b-gray-300 w-full text-center pb-3 mb-4">
                آیتم‌های {category}
              </h3>

              <ul className="w-full space-y-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <span>{item.name}</span>
                      {item.price > 0 && (
                        <span className="text-sm text-gray-500">
                          {item.price.toLocaleString()} تومان
                        </span>
                      )}
                    </li>
                  ))
                ) : (
                  <li className="text-center text-gray-400 py-4">
                    آیتمی یافت نشد
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          <MenuCategory
            icon={Coffee}
            title="اسپرسوبار"
            description={["اسپرسو", "ترک", "کاپوچینو"]}
            category="اسپرسوبار"
          />
          <MenuCategory
            icon={ColdCoffee}
            title="کلد کافی"
            description={["آفوگاتو", "آیس لاته"]}
          />
          <MenuCategory
            icon={HotDrink}
            title="نوشیدنی گرم"
            description={["شیربیسکوئیت", "هات چاکلت"]}
          />
          <MenuCategory
            icon={Tea}
            title="چای"
            description={["ماسالا", "هل", "دارچین"]}
          />
          <MenuCategory
            icon={MilkShake}
            title="میلک شیک"
            description={["شکلاتی", "نوتلا", "شیک پسته"]}
          />
          <MenuCategory
            icon={ColdDrink}
            title="نوشیدنی سرد"
            description={["موهیتو", "پینک", "شیرموز"]}
          />
          <MenuCategory
            icon={Cake}
            title="کیک و دسر"
            description={["وافل نوتلا", "چیزکیک", "ترامیسو"]}
          />
          <MenuCategory
            icon={Food}
            title="غذا و سالاد"
            description={["پاستا آلفردو", "ذرت مکزیکی"]}
          />
          <MenuCategory
            icon={IceCream}
            title="بستنی"
            description={["شکلاتی", "توت فرنگی", "گردویی"]}
          />
          <MenuCategory
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
