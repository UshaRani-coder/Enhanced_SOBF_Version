import { Link } from "react-router-dom";
import { getSidebarItemClass } from "../../utils/sidebarUtils.js";

const SidebarItem = ({
  item,
  isCollapsed,
  isActive,
  onClick,
  className = "",
}) => {
  const Icon = item.icon;

  return (
    <li>
      <Link
        to={item.path}
        onClick={onClick}
        className={`${getSidebarItemClass(isActive)} ${className}`}
      >
        <Icon className={`text-lg ml-4 ${item.iconClassName || ""}`} />

        {!isCollapsed && (
          <span className="ml-4">
            {item.title}
          </span>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;