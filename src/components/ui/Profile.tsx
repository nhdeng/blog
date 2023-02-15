interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const Profile: React.FC<IProps> = (props) => {
  return (
    <div {...props}>
      <div className="flex flex-col items-center bg-white">
        <h2 className="text-gray-500 py-4">个人信息</h2>
        <img
          src="https://www.hddata.cn/img/product1.png"
          alt="avatar"
          className="w-32 h-32 rounded-full"
        />
        <h2 className="text-gray-500 py-3">nhdeng</h2>

        <div className="flex justify-between w-full px-6 py-6">
          <div className="flex flex-col items-center">
            <span>文章</span>
            <span>42</span>
          </div>
          <div className="flex flex-col items-center">
            <span>标签</span>
            <span>42</span>
          </div>
          <div className="flex flex-col items-center">
            <span>归档</span>
            <span>42</span>
          </div>
        </div>

        <div className="flex">
          <div>github</div>
          <div>掘金</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
