interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  blogs: unknown[];
}

const BlogList: React.FC<IProps> = (props) => {
  const { blogs } = props;
  if (!blogs || !blogs.length) {
    return <span>暂无内容</span>;
  }
  // 标签渲染
  const _renderTags = (tags: string[]) => {
    return tags.map((tag) => {
      return (
        <div key={"tag"} className="mr-3 text-sm text-gray-600">
          <i className="iconfont icon-biaoqian text-xs"></i>
          <span>{tag}</span>
        </div>
      );
    });
  };
  // 博客渲染
  const _renderBlogItem = () => {
    return blogs.map((blog: any) => {
      return (
        <a
          key={blog.id}
          className="flex flex-col w-full mb-6 shadow-sm rounded overflow-hidden bg-white hover:shadow-md cursor-pointer 
          md:flex-row"
          href={`/blog/${blog.id}`}
        >
          <div className="w-full md:w-60">
            {blog?.data?.image?.src && (
              <img
                className="object-cover w-full h-40 md:w-60"
                src={blog?.data?.image?.src}
                alt={blog?.data?.image?.alt}
              />
            )}
          </div>
          <div
            className="flex w-full flex-col justify-between px-2 py-2
          md:pl-6 md:pt-4 md:pr-4 md:pb-2 md:w-[calc(100%-240px)]"
          >
            <div className="text-xl font-medium text-gray-700 mb-2 md:text-2xl">
              {blog.data.title}
            </div>
            <div>
              <p className="text-gray-600 leading-5 text-justify line-clamp-2 text-sm">
                {blog.data.desc}
              </p>
              <p className="mt-3 text-sm text-gray-500">
                {blog.data.publishDate}
              </p>
              <div className="flex flex-wrap items-center">
                {_renderTags(blog.data.tags || [])}
              </div>
            </div>
          </div>
        </a>
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
