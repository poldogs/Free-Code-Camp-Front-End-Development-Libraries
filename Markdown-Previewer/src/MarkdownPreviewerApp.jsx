import React, { useState, useEffect } from 'react';
import {marked} from 'marked';
import { FaReact } from 'react-icons/fa'; 

export const MarkdownPreviewerApp = () => {
  const [text, setText] = useState(`# Heading 1\n## Heading 2\n[Link](https://example.com)\n\`Inline code\`\n\`\`\`javascript\n// This is a code block\nconst hello = 'Hello, world!';\nconsole.log(hello);\n\`\`\`\n- List item\n> Blockquote\n![Image](https://example.com/image.jpg)\n**Bold text**`);

  useEffect(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
    document.getElementById('preview').innerHTML = marked(text);
  }, [text]);

  return (
    <div>
      <h1><FaReact /> Markdown Previewer</h1>
      <textarea id="editor" value={text} onChange={(e) => setText(e.target.value)} />
      <div id="preview" />
    </div>
  );
};