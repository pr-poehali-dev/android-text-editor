import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface SettingsPanelProps {
  onClose: () => void;
}

export default function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [fontSize, setFontSize] = useState([14]);
  const [tabSize, setTabSize] = useState('2');
  const [wordWrap, setWordWrap] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-medium">Настройки</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Редактор</h3>
          
          <div className="space-y-2">
            <Label htmlFor="fontSize" className="text-sm">
              Размер шрифта: {fontSize[0]}px
            </Label>
            <Slider
              id="fontSize"
              min={10}
              max={24}
              step={1}
              value={fontSize}
              onValueChange={setFontSize}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tabSize" className="text-sm">Размер табуляции</Label>
            <Select value={tabSize} onValueChange={setTabSize}>
              <SelectTrigger id="tabSize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 пробела</SelectItem>
                <SelectItem value="4">4 пробела</SelectItem>
                <SelectItem value="8">8 пробелов</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="wordWrap" className="text-sm">Перенос строк</Label>
            <Switch
              id="wordWrap"
              checked={wordWrap}
              onCheckedChange={setWordWrap}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="lineNumbers" className="text-sm">Номера строк</Label>
            <Switch
              id="lineNumbers"
              checked={lineNumbers}
              onCheckedChange={setLineNumbers}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="autoSave" className="text-sm">Автосохранение</Label>
            <Switch
              id="autoSave"
              checked={autoSave}
              onCheckedChange={setAutoSave}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">О приложении</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Текстовый редактор v1.0.0</p>
            <p>Встроенный файловый менеджер</p>
            <p>Поддержка подсветки синтаксиса</p>
          </div>
        </div>
      </div>
    </div>
  );
}