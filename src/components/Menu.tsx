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
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

interface ItemsData {
  name: string;
  category: string;
  price: number;
  status: boolean;
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function Menu() {
  const data: ItemsData[] = [
    { name: "اسپرسو", category: "اسپرسوبار", price: 85000, status: true },
    { name: "آفوگاتو", category: "کلد کافی", price: 120000, status: true },
    { name: "کاپوچینو", category: "اسپرسوبار", price: 95000, status: true },
    { name: "آیس لاته", category: "کلد کافی", price: 110000, status: true },
    { name: "هات چاکلت", category: "نوشیدنی گرم", price: 105000, status: true },
  ];

  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("خطا در خواندن سبد از localStorage:", error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  function handleClickPopover(selectedCategory: string) {
    setCategory(selectedCategory);
    setIsOpen(true);
  }

  function closePopover() {
    setIsOpen(false);
    setCategory("");
  }

  function addToCart(item: ItemsData) {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) {
        return prev.map((c) =>
          c.name === item.name ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { name: item.name, price: item.price, quantity: 1 }];
    });
  }

  function updateQuantity(name: string, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(name: string) {
    setCart((prev) => prev.filter((item) => item.name !== name));
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = data.filter((item) => item.category === category);

  function handlePayment() {
    if (cart.length === 0) return alert("سبد خرید خالی است!");
    alert(
      `پرداخت با موفقیت انجام شد!\nمبلغ: ${totalPrice.toLocaleString()} تومان`,
    );
    setCart([]);
    setIsCartOpen(false);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="menu min-h-screen relative" id="menu">
      <button
        onClick={() => setIsCartOpen(true)}
        className="btn-primary fixed bottom-6 left-6 z-30 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition cursor-pointer"
      >
        <span className="text-2xl">
          <ShoppingCart style={{ color: "#fff" }} />
        </span>
        {totalItems > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-gray-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            style={{ color: "#fff" }}
          >
            {totalItems}
          </span>
        )}
      </button>

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
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 animate-fade-in"
              onClick={closePopover}
            />
            <div className="relative w-[90%] max-w-md p-8 bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col items-center z-50 animate-scale-in">
              <button
                onClick={closePopover}
                className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-700 text-xl"
              >
                ✕
              </button>

              <h3 className="text-2xl border-b border-gray-200 w-full text-center pb-3 mb-4">
                آیتم‌های {category}
              </h3>

              <ul className="w-full space-y-3 max-h-[60vh] overflow-y-auto">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const cartItem = cart.find((c) => c.name === item.name);
                    const quantity = cartItem ? cartItem.quantity : 0;

                    return (
                      <li
                        key={item.name}
                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.price.toLocaleString()} تومان
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              if (quantity > 0) {
                                updateQuantity(item.name, -1);
                              }
                            }}
                            disabled={quantity === 0}
                            className={`w-8 h-8 rounded-md flex items-center justify-center text-lg transition
                ${
                  quantity === 0
                    ? "bg-gray-200 text-white cursor-not-allowed"
                    : "w-8 h-8 rounded-md bg-gray-300 hover:bg-gray-400 cursor-pointer text-white flex items-center justify-center text-lg transition"
                }`}
                          >
                            −
                          </button>

                          <span className="w-6 text-center font-medium">
                            {quantity}
                          </span>

                          <button
                            onClick={() => addToCart(item)}
                            className="btn-primary w-8 h-8 rounded-md cursor-pointer text-white flex items-center justify-center text-lg transition"
                          >
                            +
                          </button>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="text-center text-gray-400 py-6">
                    آیتمی یافت نشد
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-black/40 animate-fade-in"
              onClick={() => setIsCartOpen(false)}
            />

            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in">
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-xl font-bold">سبد خرید</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <span className="text-5xl mb-3">🛒</span>
                    <p>سبد خرید خالی است</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between gap-3 border-b pb-4"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.price.toLocaleString()} تومان
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.name, -1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.name, 1)}
                            className="btn-primary w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                        >
                          حذف
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-5 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>جمع کل:</span>
                    <span>{totalPrice.toLocaleString()} تومان</span>
                  </div>
                  <button
                    onClick={handlePayment}
                    className="btn-primary w-full text-white py-3 rounded-xl font-medium transition cursor-pointer"
                  >
                    پرداخت و ثبت سفارش
                  </button>
                </div>
              )}
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
