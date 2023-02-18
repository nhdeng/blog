export interface BlogPosts {
  id: string;
  collection: string;
  body: string;
  data: {
    tags: string[];
    title: string;
    desc: string;
    author: string;
    publishDate: string;
    authorContact: string;
    image: Object;
  };
}
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  postsNumber: number;
  tags: string[];
  collections: string[];
  topPosts: BlogPosts[];
}

const Profile: React.FC<IProps> = (props) => {
  const { postsNumber, tags, collections, topPosts } = props;
  return (
    <div {...props}>
      <div className="flex flex-col items-center pb-6 bg-white rounded shadow-sm">
        <h2 className="text-gray-500 py-4">个人信息</h2>
        <img
          src={"/images/avatar.jpg"}
          alt="avatar"
          className="w-32 h-32 rounded-full object-cover"
        />
        <h2 className="text-gray-500 py-3">nhdeng</h2>

        <div className="flex justify-between w-full px-10 py-6">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-gray-600">文章</span>
            <span className="text-gray-700 text-sm  mt-1">{postsNumber}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold  text-gray-600">标签</span>
            <span className="text-gray-700 text-sm  mt-1">{tags.length}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold  first-letter: text-gray-600">
              归档
            </span>
            <span className="text-gray-700 text-sm mt-1">
              {collections.length}
            </span>
          </div>
        </div>

        <div className="flex">
          <a
            href="https://github.com/nhdeng"
            target={"_blank"}
            title="跳转至github"
            className="iconfont icon-github text-2xl text-gray-900 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col items-center bg-white rounded shadow-sm mt-6">
        <h2 className="text-gray-500 py-4">近期文章</h2>
        <ul className="flex flex-col w-full">
          {topPosts.map((item) => {
            return (
              <li className="px-4 mb-4" key={item.data.title}>
                <a href={`/blog/${item.id}`}>
                  <h2 className="line-clamp-1 text-gray-700 hover:underline">
                    {item.data.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {item.data.publishDate}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
