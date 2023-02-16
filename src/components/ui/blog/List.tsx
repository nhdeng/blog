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
        <div key={"tag"} className="mr-2 text-sm text-gray-700">
          <i className="iconfont icon-biaoqian"></i>
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
          className="flex w-full mb-6 shadow-sm rounded-md overflow-hidden bg-white hover:shadow-md cursor-pointer"
          href={`/blog/${blog.id}`}
        >
          <div className="w-60">
            {blog?.data?.image?.src && (
              <img
                className="object-cover h-40"
                width={240}
                height={120}
                src={blog?.data?.image?.src}
                alt={blog?.data?.image?.alt}
              />
            )}
          </div>
          <div className="flex flex-col justify-between pl-6 pt-4 pr-4 pb-2 w-[calc(100%-240px)]">
            <h2 className="text-2xl font-medium">{blog.data.title}</h2>
            <div className="">
              <p className="text-gray-600 leading-5 text-justify line-clamp-2 text-sm">
                {blog.data.desc}
              </p>
              <p className="mt-2 text-sm text-gray-500">
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
