import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CodeEditorProps {
  fileName: string;
  fileExtension: string;
  initialContent?: string;
  onContentChange?: (content: string) => void;
}

const syntaxHighlight = (code: string, extension: string): string => {
  const keywords: Record<string, string[]> = {
    js: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from'],
    tsx: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'from', 'interface', 'type'],
    css: ['color', 'background', 'margin', 'padding', 'display', 'flex', 'grid'],
    html: ['html', 'head', 'body', 'div', 'span', 'p', 'a', 'img']
  };

  return code;
};

export default function CodeEditor({ fileName, fileExtension, initialContent = '', onContentChange }: CodeEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [lineCount, setLineCount] = useState(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const lines = content.split('\n').length;
    setLineCount(lines);
  }, [content]);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (content) {
        setLastSaved(new Date());
        onContentChange?.(content);
      }
    }, 3000);

    return () => clearInterval(autoSaveInterval);
  }, [content, onContentChange]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <Icon name="FileCode" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium">{fileName}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {lastSaved && (
            <div className="flex items-center gap-1">
              <Icon name="Check" size={14} className="text-primary" />
              <span>Сохранено {formatTime(lastSaved)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Icon name="Type" size={14} />
            <span>{fileExtension.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-12 bg-muted flex flex-col items-end py-4 px-2 text-xs text-muted-foreground font-mono select-none">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            className="absolute inset-0 w-full h-full font-mono text-sm resize-none border-0 focus-visible:ring-0 leading-6 p-4 bg-[hsl(var(--editor-bg))] text-[hsl(var(--editor-text))]"
            placeholder="Начните писать код..."
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}