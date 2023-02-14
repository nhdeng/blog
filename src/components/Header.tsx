const Header = () => {
  return (
    <header className="h-12 bg-white px-6 group cursor-pointer dark:bg-gray-800">
      <div className="w-full h-12 flex justify-center items-center">
        <h2>博客-忆往昔</h2>
      </div>
      <div
        className="flex items-center justify-between h-12
        fixed -top-12 left-0 w-full z-50
        group-hover:top-0 px-6 bg-white 
        dark:bg-gray-800"
      >
        <h2>博客-忆往昔</h2>
        <ul className="flex items-center">
          <li>首页</li>
          <li>文章</li>
          <li>标签</li>
          <li>关于</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
