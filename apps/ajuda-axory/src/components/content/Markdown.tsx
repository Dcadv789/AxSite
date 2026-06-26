import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import MermaidDiagram from './MermaidDiagram';

const components: Components = {
  // Headings with anchors
  h1: ({ children }) => (
    <h1 className="mt-8 first:mt-0 scroll-mt-20 text-2xl font-bold text-gray-900 dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => {
    const id = typeof children === 'string'
      ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      : undefined;
    return (
      <h2 id={id} className="mt-8 scroll-mt-20 text-xl font-semibold text-gray-900 dark:text-white">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = typeof children === 'string'
      ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
      : undefined;
    return (
      <h3 id={id} className="mt-6 scroll-mt-20 text-base font-semibold text-gray-900 dark:text-white">
        {children}
      </h3>
    );
  },
  // Callout for blockquote
  blockquote: ({ children }) => (
    <div className="my-4 flex gap-3 rounded-xl border-l-4 border-brand bg-brand-50 dark:bg-brand-500/10 px-4 py-3">
      <div className="min-w-0 text-sm text-brand-700 dark:text-blue-300 [&>p]:m-0">{children}</div>
    </div>
  ),
  // Tables
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50 dark:bg-gray-800/50">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
  // Code blocks — detect mermaid
  code: ({ className, children, ...props }) => {
    const language = (className ?? '').replace('language-', '');
    const value = String(children).replace(/\n$/, '');

    if (language === 'mermaid') {
      return <MermaidDiagram chart={value} />;
    }

    if (!className) {
      return (
        <code
          className="rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[0.85em] font-mono text-gray-800 dark:text-gray-200"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <pre className="my-4 overflow-x-auto rounded-xl bg-gray-900 dark:bg-gray-800 p-4">
        <code className="text-sm font-mono text-gray-100">{value}</code>
      </pre>
    );
  },
  pre: ({ children }) => <>{children}</>,
  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="font-medium text-brand hover:underline"
    >
      {children}
    </a>
  ),
  // Lists
  ul: ({ children }) => (
    <ul className="my-4 ml-5 list-disc space-y-1.5 text-gray-700 dark:text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-5 list-decimal space-y-1.5 text-gray-700 dark:text-gray-300">{children}</ol>
  ),
  li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
  p: ({ children }) => <p className="my-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700" />,
};

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="min-w-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
