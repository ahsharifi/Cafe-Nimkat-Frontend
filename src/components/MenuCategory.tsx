interface MenuItemProps {
  icon: string;
  title: string;
  description: string[];
  category: string;
  onClick: (category: string) => void;
}

function MenuCategory({
  icon,
  title,
  description,
  category,
  onClick,
}: MenuItemProps) {
  return (
    <li
      className="menu-item bg-white rounded-xl shadow-gray-200 shadow-lg flex flex-col items-center p-5 gap-2 hover:bg-gray-50 cursor-pointer transition"
      onClick={() => onClick(category)}
    >
      <div className="icon w-20 h-20 p-4 bg-green-50 rounded-full mb-2">
        <img src={icon} alt={title} className="w-full h-full object-contain" />
      </div>

      <h3 className="text-2xl">{title}</h3>

      <p className="text-sm text-gray-500 text-center">
        {description.join(" - ")} - ...
      </p>
    </li>
  );
}

export default MenuCategory;
