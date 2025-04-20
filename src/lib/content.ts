import fs from 'fs';
import matter from 'gray-matter';
import { Log } from '@/types/Log';

import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const CONTENT_DIR = 'content/admin';

// let logsCache: Log[] | null = null;

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  // .use(rehypeAutolinkHeadings)
  .use(rehypeHighlight)
  .use(rehypeStringify);

export async function getContent(): Promise<Log[]> {
  // if (logsCache) return logsCache;

  try {
    const dirContent = fs.readdirSync(CONTENT_DIR, 'utf-8');

    const logs = await Promise.all(
      dirContent.map(async (file) => {
        const fileContent = fs.readFileSync(`${CONTENT_DIR}/${file}`, 'utf-8');
        const { data, content } = matter(fileContent);

        const htmlContent = await processor.process(content);

        return {
          timestamp: file.replace('.md', ''),
          title: data.title,
          tag: data.tag,
          author: data.author,
          content: String(htmlContent),
        };
      })
    );

    // Sort logs by timestamp in ascending order
    logs.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    // logsCache = logs;
    return logs;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}
