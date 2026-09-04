const API_URL = import.meta.env.VITE_API_URL;

export const getMenuCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const getCategoryItems = async (categoryId: number) => {
  const response = await fetch(`${API_URL}/categories/${categoryId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch category items");
  }

  return response.json();
};

interface CreateOrderData {
  order_type: "dine_in" | "takeaway";
  table_number: number | null;
  payment_method: "cash" | "online";
  items: {
    menu_item_id: number;
    quantity: number;
  }[];
}

export const createOrder = async (data: CreateOrderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("خطا در ثبت سفارش");
  }

  return response.json();
};

export const getPaymentUrl = async (orderId: number) => {
  const response = await fetch(`${API_URL}/payment/${orderId}`);

  if (!response.ok) {
    throw new Error("خطا در ایجاد پرداخت");
  }

  return response.json();
};
