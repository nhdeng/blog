interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const BlogList: React.FC<IProps> = (props) => {
  const _renderTags = () => {
    return [1, 1, 1].map((tag) => {
      return <div className="mr-2 text-sm text-gray-700">前端</div>;
    });
  };
  const _renderBlogItem = () => {
    return [1, 1, 1].map(() => {
      return (
        <div className="flex w-full mb-6 shadow-lg rounded-md overflow-hidden">
          <div className="w-60">
            <img
              className="object-contain h-40"
              src="https://www.hddata.cn/img/product1.png"
              alt="blog cover"
            />
          </div>
          <div className="flex flex-col justify-between pl-6 pt-4 pr-4 pb-2 w-[calc(100%-240px)]">
            <h2 className="text-2xl font-medium">React技术揭秘</h2>
            <div className="">
              <p className="text-gray-600 leading-5 text-justify line-clamp-2 text-sm">
                this is contenthahaha 版权所有 (C) Microsoft
                Corporation。保留所有权利版权所有 (C) Microsoft
                Corporation。保留所有权利版权所有 (C) Microsoft
                Corporation。保留所有权利版权所有 (C) Microsoft
              </p>
              <p className="mt-2 text-sm text-gray-500">2023-02-15 15:20:23</p>
              <div className="flex flex-wrap items-center">{_renderTags()}</div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div {...props}>
      <div>{_renderBlogItem()}</div>
    </div>
  );
};

export default BlogList;
