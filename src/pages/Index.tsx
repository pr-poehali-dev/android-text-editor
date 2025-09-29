import { useState } from 'react';
import FileManager from '@/components/FileManager';
import CodeEditor from '@/components/CodeEditor';
import SettingsPanel from '@/components/SettingsPanel';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  children?: FileNode[];
}

const defaultFileContent: Record<string, string> = {
  '2': '// main.js\nconst app = document.getElementById("app");\n\nfunction init() {\n  console.log("App initialized");\n}\n\ninit();',
  '3': '// App.tsx\nimport React from "react";\n\nfunction App() {\n  return (\n    <div className="app">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;',
  '4': '/* styles.css */\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n}\n\n.app {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}',
  '6': '// Header.tsx\nexport default function Header() {\n  return <header>Header Component</header>;\n}',
  '7': '// Footer.tsx\nexport default function Footer() {\n  return <footer>Footer Component</footer>;\n}',
  '9': '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>My App</title>\n</head>\n<body>\n  <div id="app"></div>\n</body>\n</html>',
  '10': '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "main": "index.js"\n}',
  '11': '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "dependencies": {}\n}',
  '12': '# README\n\nThis is my project documentation.\n\n## Getting Started\n\nRun `npm install` to get started.'
};

export default function Index() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const handleContentChange = (content: string) => {
    console.log('Content changed:', content);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="h-14 flex items-center justify-between px-4 bg-secondary border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-secondary-foreground"
          >
            <Icon name={sidebarCollapsed ? 'PanelLeftOpen' : 'PanelLeft'} size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <Icon name="Code" size={24} className="text-primary" />
            <h1 className="text-lg font-medium text-secondary-foreground">Text Editor</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-secondary-foreground">
            <Icon name="Save" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-secondary-foreground">
            <Icon name="Search" size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="text-secondary-foreground"
          >
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {!sidebarCollapsed && (
          <div className="w-64 border-r border-sidebar-border">
            <FileManager onFileSelect={handleFileSelect} selectedFileId={selectedFile?.id || null} />
          </div>
        )}

        <div className="flex-1 overflow-hidden">
          {selectedFile ? (
            <CodeEditor
              fileName={selectedFile.name}
              fileExtension={selectedFile.extension || ''}
              initialContent={defaultFileContent[selectedFile.id] || ''}
              onContentChange={handleContentChange}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-4">
                <Icon name="FileCode" size={64} className="mx-auto opacity-20" />
                <div>
                  <p className="text-lg font-medium">Выберите файл для редактирования</p>
                  <p className="text-sm">Откройте файл из панели слева</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showSettings && (
          <div className="w-80">
            <SettingsPanel onClose={() => setShowSettings(false)} />
          </div>
        )}
      </div>
    </div>
  );
}