import { useState } from 'react';
import FileManager from '@/components/FileManager';
import CodeEditor from '@/components/CodeEditor';
import SettingsPanel from '@/components/SettingsPanel';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
  const [showFileManager, setShowFileManager] = useState(false);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      setShowFileManager(false);
    }
  };

  const handleContentChange = (content: string) => {
    console.log('Content changed:', content);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="h-14 md:h-16 flex items-center justify-between px-3 md:px-4 bg-secondary border-b border-border">
        <div className="flex items-center gap-2 md:gap-3">
          <Sheet open={showFileManager} onOpenChange={setShowFileManager}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-secondary-foreground h-10 w-10 md:h-9 md:w-9"
              >
                <Icon name="Menu" size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
              <FileManager onFileSelect={handleFileSelect} selectedFileId={selectedFile?.id || null} />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-1.5 md:gap-2">
            <Icon name="Code" size={22} className="text-primary" />
            <h1 className="text-base md:text-lg font-medium text-secondary-foreground hidden xs:block">Editor</h1>
          </div>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          {selectedFile && (
            <Button variant="ghost" size="icon" className="text-secondary-foreground h-10 w-10 md:h-9 md:w-9">
              <Icon name="Save" size={20} />
            </Button>
          )}
          <Sheet open={showSettings} onOpenChange={setShowSettings}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-secondary-foreground h-10 w-10 md:h-9 md:w-9"
              >
                <Icon name="Settings" size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
              <SettingsPanel onClose={() => setShowSettings(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {selectedFile ? (
          <CodeEditor
            fileName={selectedFile.name}
            fileExtension={selectedFile.extension || ''}
            initialContent={defaultFileContent[selectedFile.id] || ''}
            onContentChange={handleContentChange}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground px-4">
            <div className="text-center space-y-4 max-w-md">
              <Icon name="FileCode" size={56} className="mx-auto opacity-20" />
              <div>
                <p className="text-base md:text-lg font-medium">Выберите файл</p>
                <p className="text-sm text-muted-foreground mt-1">Нажмите на меню слева</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}