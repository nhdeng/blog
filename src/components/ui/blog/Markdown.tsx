import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "../../../styles/base.css";
interface IProps {
  markdown: string;
}

const Markdown: React.FC<IProps> = ({ markdown }) => {
  return (
    <ReactMarkdown
      children={markdown}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            // @ts-ignore
            <SyntaxHighlighter
              children={String(children)}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

export default Markdown;
