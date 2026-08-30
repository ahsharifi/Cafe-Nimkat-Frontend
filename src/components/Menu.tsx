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
        {/* پاپ‌اور */}
        {isOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 animate-fade-in"
              onClick={closePopover}
            />

            {/* Modal */}
            <div className="relative w-[90%] max-w-md p-8 bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col items-center z-50 animate-scale-in">
              <button
                onClick={closePopover}
                className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl transition"
              >
                ✕
              </button>

              <h3 className="text-2xl border-b border-gray-200 w-full text-center pb-3 mb-4">
                آیتم‌های {category}
              </h3>

              <ul className="w-full space-y-2 max-h-[60vh] overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0"
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
                  <li className="text-center text-gray-400 py-6">
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
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={ColdCoffee}
            title="کلد کافی"
            description={["آفوگاتو", "آیس لاته"]}
            category="کلد کافی"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={HotDrink}
            title="نوشیدنی گرم"
            description={["شیربیسکوئیت", "هات چاکلت"]}
            category="نوشیدنی گرم"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={Tea}
            title="چای"
            description={["ماسالا", "هل", "دارچین"]}
            category="چای"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={MilkShake}
            title="میلک شیک"
            description={["شکلاتی", "نوتلا", "شیک پسته"]}
            category="میلک شیک"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={ColdDrink}
            title="نوشیدنی سرد"
            description={["موهیتو", "پینک", "شیرموز"]}
            category="نوشیدنی سرد"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={Cake}
            title="کیک و دسر"
            description={["وافل نوتلا", "چیزکیک", "ترامیسو"]}
            category="کیک و دسر"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={Food}
            title="غذا و سالاد"
            description={["پاستا آلفردو", "ذرت مکزیکی"]}
            category="غذا و سالاد"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={IceCream}
            title="بستنی"
            description={["شکلاتی", "توت فرنگی", "گردویی"]}
            category="بستنی"
            onClick={handleClickPopover}
          />
          <MenuCategory
            icon={Coffee}
            title="دمنوش"
            description={["آرامبخش", "ضدسرماخوردگی"]}
            category="دمنوش"
            onClick={handleClickPopover}
          />
        </ul>
      </div>
    </div>
  );
}

export default Menu;
