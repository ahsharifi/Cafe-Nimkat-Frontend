const API_URL = import.meta.env.VITE_API_URL;

export async function getMenuCategories() {
  const response = await fetch(`${API_URL}/api/categories`);

  if (!response.ok) {
    throw new Error("خطا در دریافت دسته بندی ها.");
  }

  return response.json();
}
