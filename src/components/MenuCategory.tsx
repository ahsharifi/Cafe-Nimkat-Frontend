interface MenuItemProps {
  icon: string;
  title: string;
  categoryId: number;
  onClick: (categoryId: number) => void;
}

function MenuCategory({ icon, title, categoryId, onClick }: MenuItemProps) {
  return (
    <li
      className="menu-item bg-white rounded-xl shadow-gray-200 shadow-lg flex flex-col items-center p-5 gap-2 hover:bg-gray-50 cursor-pointer transition"
      onClick={() => onClick(categoryId)}
    >
      <div className="icon w-20 h-20 p-4 bg-green-50 rounded-full mb-2">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-2xl">{title}</h3>
    </li>
  );
}

export default MenuCategory;
