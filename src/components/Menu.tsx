import Coffee from "../assets/icons/coffee.png";
import MenuCategory from "./MenuCategory";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  getMenuCategories,
  getCategoryItems,
  createOrder,
  getPaymentUrl,
} from "../api/api";

interface Category {
  id: number;
  title: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
}

interface ItemsData {
  id: number;
  category_id: number;
  title: string;
  description: string | null;
  price: number;
  is_available: boolean;
  sort_order: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type OrderType = "dine_in" | "takeaway";
type PaymentMethod = "cash" | "online";

function Menu() {
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("خطا در خواندن سبد:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<ItemsData[]>([]);

  // اطلاعات سفارش
  const [isOrderInfoOpen, setIsOrderInfoOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [tableNumber, setTableNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );

  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // نتیجه پرداخت
  const [paymentResult, setPaymentResult] = useState<
    "success" | "failed" | null
  >(null);

  const [paymentOrderId, setPaymentOrderId] = useState<string | null>(null);

  async function handleClickPopover(selectedCategory: number) {
    try {
      setCategoryId(selectedCategory);

      const items = await getCategoryItems(selectedCategory);

      setMenuItems(items);
      setIsOpen(true);
    } catch (error) {
      console.error("خطا در دریافت آیتم‌های دسته:", error);
    }
  }

  function closePopover() {
    setIsOpen(false);
    setCategoryId(null);
    setMenuItems([]);
  }

  // اضافه کردن محصول به سبد
  function addToCart(item: ItemsData) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);

      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: 1,
        },
      ];
    });
  }

  function updateQuantity(id: number, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const selectedCategory = categories.find(
    (category) => category.id === categoryId,
  );

  // باز کردن فرم ثبت سفارش
  function openOrderInfo(payment: PaymentMethod) {
    if (cart.length === 0) {
      alert("سبد خرید خالی است!");
      return;
    }

    setPaymentMethod(payment);
    setOrderType(null);
    setTableNumber("");
    setIsOrderInfoOpen(true);
  }

  // ثبت نهایی سفارش
  async function submitOrder() {
    if (!orderType) {
      alert("نوع سفارش را انتخاب کنید.");
      return;
    }

    if (orderType === "dine_in" && !tableNumber.trim()) {
      alert("لطفاً شماره میز را وارد کنید.");
      return;
    }

    if (!paymentMethod) {
      alert("روش پرداخت را انتخاب کنید.");
      return;
    }

    try {
      setIsSubmittingOrder(true);

      const order = await createOrder({
        order_type: orderType,
        table_number: orderType === "dine_in" ? Number(tableNumber) : null,
        payment_method: paymentMethod,
        items: cart.map((item) => ({
          menu_item_id: item.id,
          quantity: item.quantity,
        })),
      });

      // پرداخت نقدی
      if (paymentMethod === "cash") {
        setCart([]);
        setIsOrderInfoOpen(false);
        setIsCartOpen(false);

        setPaymentResult("success");
        setPaymentOrderId(String(order.order.id));

        return;
      }

      // پرداخت آنلاین
      const payment = await getPaymentUrl(order.order.id);

      // سبد را هنوز خالی نمی‌کنیم
      // چون ممکن است پرداخت ناموفق شود
      window.location.href = payment.payment_url;
    } catch (error) {
      console.error("خطا در ثبت سفارش:", error);
      alert("خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmittingOrder(false);
    }
  }

  // دریافت نتیجه callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const payment = params.get("payment");
    const orderId = params.get("order_id");

    if (payment !== "success" && payment !== "failed") {
      return;
    }

    const timer = setTimeout(() => {
      setPaymentResult(payment);
      setPaymentOrderId(orderId);

      window.history.replaceState({}, document.title, window.location.pathname);

      if (payment === "success") {
        setCart([]);
        setIsCartOpen(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // دریافت دسته‌بندی‌ها
  useEffect(() => {
    getMenuCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  // ذخیره سبد
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="menu min-h-screen relative" id="menu">
      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="btn-primary fixed bottom-6 left-6 z-30 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition cursor-pointer"
      >
        <ShoppingCart style={{ color: "#fff" }} />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      <div className="container mx-auto w-[90%] min-h-screen flex flex-col items-center py-15 gap-2 md:gap-4">
        {/* Title */}
        <div className="title">
          <h1 className="text-4xl mb-10">امروز چی می چسبه؟</h1>

          <div className="lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        {/* Category Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={closePopover}
            />

            <div className="relative w-[90%] max-w-md p-8 bg-white border border-gray-200 shadow-2xl rounded-2xl flex flex-col items-center z-50">
              <button
                onClick={closePopover}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-2xl border-b border-gray-200 w-full text-center pb-3 mb-4">
                آیتم‌های {selectedCategory?.title}
              </h3>

              <ul className="w-full space-y-3 max-h-[60vh] overflow-y-auto">
                {menuItems.length > 0 ? (
                  menuItems.map((item) => {
                    const cartItem = cart.find((c) => c.id === item.id);

                    const quantity = cartItem?.quantity ?? 0;

                    return (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-3 border-b border-gray-100"
                      >
                        <div>
                          <p className="font-medium">{item.title}</p>

                          <p className="text-sm text-gray-500">
                            {item.price.toLocaleString()} تومان
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              if (quantity > 0) {
                                updateQuantity(item.id, -1);
                              }
                            }}
                            disabled={quantity === 0}
                            className="w-8 h-8 rounded-md bg-gray-300 text-white flex items-center justify-center cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed"
                          >
                            −
                          </button>

                          <span className="w-6 text-center font-medium">
                            {quantity}
                          </span>

                          <button
                            onClick={() => addToCart(item)}
                            className="btn-primary w-8 h-8 rounded-md text-white flex items-center justify-center cursor-pointer"
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

        {/* Cart */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsCartOpen(false)}
            />

            <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col">
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
                        key={item.id}
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
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                          >
                            −
                          </button>

                          <span className="w-6 text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="btn-primary w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
                        >
                          حذف
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="border-t p-5 space-y-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>جمع کل:</span>

                    <span>{totalPrice.toLocaleString()} تومان</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openOrderInfo("cash")}
                      className="btn-primary w-full text-white py-3 rounded-xl font-medium cursor-pointer"
                    >
                      پرداخت نقدی
                    </button>

                    <button
                      onClick={() => openOrderInfo("online")}
                      className="btn-primary w-full text-white py-3 rounded-xl font-medium cursor-pointer"
                    >
                      پرداخت آنلاین
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Order Info Modal */}
        {isOrderInfoOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                if (!isSubmittingOrder) {
                  setIsOrderInfoOpen(false);
                }
              }}
            />

            <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 z-10">
              <button
                onClick={() => setIsOrderInfoOpen(false)}
                disabled={isSubmittingOrder}
                className="absolute top-4 right-4 text-gray-400 text-xl cursor-pointer"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-center mb-6">
                اطلاعات سفارش
              </h3>

              {/* Order Type */}
              <div className="space-y-3">
                <p className="font-medium">نوع سفارش:</p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("dine_in");
                    }}
                    className={`py-3 rounded-xl border cursor-pointer ${
                      orderType === "dine_in"
                        ? "btn-primary text-white"
                        : "bg-gray-50"
                    }`}
                  >
                    داخل سالن
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setTableNumber("");
                    }}
                    className={`py-3 rounded-xl border cursor-pointer ${
                      orderType === "takeaway"
                        ? "btn-primary text-white"
                        : "bg-gray-50"
                    }`}
                  >
                    بیرون‌بر
                  </button>
                </div>
              </div>

              {/* Table Number */}
              {orderType === "dine_in" && (
                <div className="mt-5">
                  <label className="block mb-2 font-medium">شماره میز</label>

                  <input
                    type="number"
                    min="1"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="مثلاً 5"
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:border-gray-400"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div className="mt-5">
                <p className="font-medium mb-2">روش پرداخت:</p>

                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  {paymentMethod === "cash"
                    ? "💵 پرداخت نقدی"
                    : "💳 پرداخت آنلاین"}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={submitOrder}
                disabled={isSubmittingOrder}
                className="btn-primary w-full text-white py-3 rounded-xl mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingOrder
                  ? "در حال ثبت سفارش..."
                  : paymentMethod === "online"
                    ? "ادامه و پرداخت"
                    : "ثبت سفارش"}
              </button>
            </div>
          </div>
        )}

        {/* Payment Result Modal */}
        {paymentResult && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 text-center">
              {paymentResult === "success" ? (
                <>
                  <div className="text-6xl mb-4">✅</div>

                  <h3 className="text-2xl font-bold text-green-600 mb-3">
                    پرداخت موفق بود
                  </h3>

                  <p className="text-gray-600">سفارش شما با موفقیت ثبت شد.</p>

                  {paymentOrderId && (
                    <p className="mt-3 text-sm text-gray-500">
                      شماره سفارش: {paymentOrderId}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">❌</div>

                  <h3 className="text-2xl font-bold text-red-600 mb-3">
                    پرداخت ناموفق بود
                  </h3>

                  <p className="text-gray-600">
                    پرداخت انجام نشد. می‌توانید دوباره تلاش کنید.
                  </p>

                  {paymentOrderId && (
                    <p className="mt-3 text-sm text-gray-500">
                      شماره سفارش: {paymentOrderId}
                    </p>
                  )}
                </>
              )}

              <button
                onClick={() => setPaymentResult(null)}
                className="btn-primary w-full text-white py-3 rounded-xl mt-6 cursor-pointer"
              >
                بستن
              </button>
            </div>
          </div>
        )}

        {/* Categories */}
        <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {categories.map((category) => (
            <MenuCategory
              key={category.id}
              icon={Coffee}
              title={category.title}
              categoryId={category.id}
              onClick={handleClickPopover}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
