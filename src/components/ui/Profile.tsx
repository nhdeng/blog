interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const Profile: React.FC<IProps> = (props) => {
  return (
    <div {...props}>
      <div className="flex flex-col items-center pb-6 bg-white rounded shadow-sm">
        <h2 className="text-gray-500 py-4">个人信息</h2>
        <img
          src="https://www.hddata.cn/img/product1.png"
          alt="avatar"
          className="w-32 h-32 rounded-full"
        />
        <h2 className="text-gray-500 py-3">nhdeng</h2>

        <div className="flex justify-between w-full px-8 py-6">
          <div className="flex flex-col items-center">
            <span className="font-semibold">文章</span>
            <span className="text-gray-600">42</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold">标签</span>
            <span className="text-gray-600">42</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold">归档</span>
            <span className="text-gray-600">42</span>
          </div>
        </div>

        <div className="flex">
          <a
            title="跳转至github"
            className="iconfont icon-github text-2xl text-gray-900 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col items-center bg-white rounded shadow-sm mt-6">
        <h2 className="text-gray-500 py-4">近期文章</h2>
        <ul className="flex flex-col w-full">
          <li className="px-4 mb-4">
            <a href="">
              <h2 className="line-clamp-1">
                React技术机密React技术机密React技术
              </h2>
              <p className="text-gray-400 text-sm">2023-02-13</p>
            </a>
          </li>
          <li className="px-4 mb-4">
            <a href="">
              <h2 className="line-clamp-1">
                React技术机密React技术机密React技术
              </h2>
              <p className="text-gray-400 text-sm">2023-02-13</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
