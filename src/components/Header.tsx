import { menus, siteTitle } from "../config";

const Header = () => {
  // 渲染静态菜单
  const _renderStaticMenus = () => {
    return menus.map((menu) => (
      <li
        className="px-4 py-2 text-sm border-b-transparent border-b  hover:border-gray-700"
        key={menu.id}
      >
        {menu.name}
      </li>
    ));
  };
  return (
    <header className="h-16 bg-white px-6 group cursor-pointer dark:bg-gray-800">
      <div className="w-full h-16 flex justify-center items-center">
        <h2 className="dark:text-white">{siteTitle}</h2>
      </div>
      <div
        className="flex items-center justify-between h-16 
        fixed left-0 w-full z-50 
        transition-all -top-16 opacity-0
        group-hover:top-0 group-hover:opacity-100
        px-6 bg-white 
        dark:bg-gray-800"
      >
        <h2 className="dark:text-white">{siteTitle}</h2>
        <ul className="flex items-center dark:text-white">
          {_renderStaticMenus()}
        </ul>
      </div>
    </header>
  );
};

export default Header;
