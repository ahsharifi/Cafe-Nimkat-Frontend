interface MenuItemProps {
  icon: string;
  title: string;
  description: string[];
}

function MenuItem({ icon, title, description }: MenuItemProps) {
  return (
    <li className="menu-item bg-white rounded-xl shadow-gray-200 shadow-lg flex flex-col items-center p-5 gap-2 hover:bg-gray-50">
      <div className="icon w-20 h-20 p-4 bg-green-50 rounded-full mb-2">
        <img src={icon} alt="icon" />
      </div>

      <h3 className="text-2xl">{title}</h3>

      <p className="text-sm">{description.join(" - ")} - ...</p>
    </li>
  );
}

export default MenuItem;
