import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  children?: FileNode[];
}

interface FileManagerProps {
  onFileSelect: (file: FileNode) => void;
  selectedFileId: string | null;
}

const mockFileSystem: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      { id: '2', name: 'main.js', type: 'file', extension: 'js' },
      { id: '3', name: 'App.tsx', type: 'file', extension: 'tsx' },
      { id: '4', name: 'styles.css', type: 'file', extension: 'css' },
      {
        id: '5',
        name: 'components',
        type: 'folder',
        children: [
          { id: '6', name: 'Header.tsx', type: 'file', extension: 'tsx' },
          { id: '7', name: 'Footer.tsx', type: 'file', extension: 'tsx' }
        ]
      }
    ]
  },
  {
    id: '8',
    name: 'public',
    type: 'folder',
    children: [
      { id: '9', name: 'index.html', type: 'file', extension: 'html' },
      { id: '10', name: 'manifest.json', type: 'file', extension: 'json' }
    ]
  },
  { id: '11', name: 'package.json', type: 'file', extension: 'json' },
  { id: '12', name: 'README.md', type: 'file', extension: 'md' }
];

const FileTreeNode = ({
  node,
  level = 0,
  onSelect,
  selectedId
}: {
  node: FileNode;
  level?: number;
  onSelect: (node: FileNode) => void;
  selectedId: string | null;
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onSelect(node);
    }
  };

  const getFileIcon = (extension?: string) => {
    switch (extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return 'Code';
      case 'html':
        return 'FileCode';
      case 'css':
        return 'Palette';
      case 'json':
        return 'Braces';
      case 'md':
        return 'FileText';
      default:
        return 'File';
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        className={`flex items-center gap-2.5 py-3 md:py-2 px-3 md:px-2 cursor-pointer active:bg-sidebar-accent/80 hover:bg-sidebar-accent transition-colors touch-manipulation ${
          selectedId === node.id ? 'bg-sidebar-accent' : ''
        }`}
      >
        {node.type === 'folder' ? (
          <Icon name={isOpen ? 'ChevronDown' : 'ChevronRight'} size={18} className="flex-shrink-0" />
        ) : (
          <span className="w-[18px]" />
        )}
        <Icon
          name={node.type === 'folder' ? (isOpen ? 'FolderOpen' : 'Folder') : getFileIcon(node.extension)}
          size={18}
          className="text-sidebar-foreground flex-shrink-0"
        />
        <span className="text-sm md:text-sm text-sidebar-foreground truncate">{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map(child => (
            <FileTreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FileManager({ onFileSelect, selectedFileId }: FileManagerProps) {
  return (
    <div className="h-full flex flex-col bg-sidebar">
      <div className="p-4 md:p-4 border-b border-sidebar-border">
        <h2 className="text-base md:text-sm font-medium text-sidebar-foreground">Файлы</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-2 md:py-2">
          {mockFileSystem.map(node => (
            <FileTreeNode
              key={node.id}
              node={node}
              onSelect={onFileSelect}
              selectedId={selectedFileId}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}