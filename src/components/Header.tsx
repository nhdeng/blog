import { menus, siteTitle } from "../config";

const Header = () => {
  // 渲染静态菜单
  const _renderStaticMenus = () => {
    return menus.map((menu) => (
      <div
        className="px-4 py-2 text-sm border-b-transparent border-b  hover:border-gray-700"
        key={menu.id}
      >
        <a className="w-full h-full" href={menu.path}>
          {menu.name}
        </a>
      </div>
    ));
  };
  return (
    <header className="h-16 bg-white px-6 group cursor-pointer dark:bg-gray-800 shadow-md">
      <div className="w-full h-16 flex justify-center items-center">
        <div className="dark:text-white">{siteTitle}</div>
      </div>
      <div
        className="flex items-center justify-between h-16 
        fixed left-0 w-full z-50 
        transition-all -top-16 opacity-0
        group-hover:top-0 group-hover:opacity-100
        px-6 bg-white 
        dark:bg-gray-800"
      >
        <div className="dark:text-white">{siteTitle}</div>
        <div className="flex items-center dark:text-white">
          {_renderStaticMenus()}
        </div>
      </div>
    </header>
  );
};

export default Header;
