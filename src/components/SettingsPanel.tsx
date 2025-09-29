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
      <div className="flex items-center justify-between p-4 md:p-4 border-b border-border">
        <h2 className="text-base md:text-lg font-medium">Настройки</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-10 w-10 md:h-9 md:w-9">
          <Icon name="X" size={22} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-4 space-y-6">
        <div className="space-y-5 md:space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Редактор</h3>
          
          <div className="space-y-3">
            <Label htmlFor="fontSize" className="text-sm font-medium">
              Размер шрифта: {fontSize[0]}px
            </Label>
            <Slider
              id="fontSize"
              min={10}
              max={24}
              step={1}
              value={fontSize}
              onValueChange={setFontSize}
              className="w-full touch-manipulation"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="tabSize" className="text-sm font-medium">Размер табуляции</Label>
            <Select value={tabSize} onValueChange={setTabSize}>
              <SelectTrigger id="tabSize" className="h-11 md:h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2" className="py-3 md:py-2">2 пробела</SelectItem>
                <SelectItem value="4" className="py-3 md:py-2">4 пробела</SelectItem>
                <SelectItem value="8" className="py-3 md:py-2">8 пробелов</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between py-2 touch-manipulation">
            <Label htmlFor="wordWrap" className="text-sm font-medium">Перенос строк</Label>
            <Switch
              id="wordWrap"
              checked={wordWrap}
              onCheckedChange={setWordWrap}
              className="touch-manipulation"
            />
          </div>

          <div className="flex items-center justify-between py-2 touch-manipulation">
            <Label htmlFor="lineNumbers" className="text-sm font-medium">Номера строк</Label>
            <Switch
              id="lineNumbers"
              checked={lineNumbers}
              onCheckedChange={setLineNumbers}
              className="touch-manipulation"
            />
          </div>

          <div className="flex items-center justify-between py-2 touch-manipulation">
            <Label htmlFor="autoSave" className="text-sm font-medium">Автосохранение</Label>
            <Switch
              id="autoSave"
              checked={autoSave}
              onCheckedChange={setAutoSave}
              className="touch-manipulation"
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">О приложении</h3>
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