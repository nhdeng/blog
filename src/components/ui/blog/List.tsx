interface IProps extends React.HTMLAttributes<HTMLDivElement> {}
const BlogList: React.FC<IProps> = (props) => {
  const _renderBlogItem = () => {
    return (
      <div className="flex w-full mb-6 shadow-sm rounded-md overflow-hidden">
        <div className="w-48">
          <img
            className="object-cover h-30"
            src="https://www.hddata.cn/img/product1.png"
            alt="blog cover"
          />
        </div>
        <div className="pl-6 py-2 w-auto">
          <h2 className="text-2xl font-medium">this is title</h2>
          <p className="mt-4 text-gray-500 leading-6 text-justify line-clamp-3">
            this is contenthahaha 版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利版权所有 (C) Microsoft
            Corporation。保留所有权利
          </p>
          <p>2023-02-15 15:20:23</p>
          <div className="flex flex-wrap items-center">
            <span>前端</span>
            <span>javascript</span>
            <span>react</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div {...props}>
      <div>{_renderBlogItem()}</div>
    </div>
  );
};

export default BlogList;
