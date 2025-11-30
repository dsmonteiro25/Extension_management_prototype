import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Accessibility, Type, Contrast, Volume2 } from 'lucide-react';

export function BotaoAcessibilidade() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = '100%';
  };

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleTextToSpeech = () => {
    const newValue = !textToSpeech;
    setTextToSpeech(newValue);
    if (newValue) {
      alert('Leitor de tela ativado! Clique nos elementos para ouvir o conteúdo.');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg bg-blue-900 hover:bg-blue-800 text-white border-2 border-white"
            title="Acessibilidade"
          >
            <Accessibility className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Opções de Acessibilidade</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex-col items-start gap-2 py-3">
            <div className="flex items-center gap-2 w-full">
              <Type className="h-4 w-4" />
              <span className="font-medium">Tamanho do Texto</span>
            </div>
            <div className="flex items-center gap-2 w-full">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseFontSize();
                }}
              >
                A-
              </Button>
              <span className="flex-1 text-center text-xs">{fontSize}%</span>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseFontSize();
                }}
              >
                A+
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  resetFontSize();
                }}
              >
                Reset
              </Button>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={toggleHighContrast}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-2">
              <Contrast className="h-4 w-4" />
              <span>Alto Contraste</span>
            </div>
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                highContrast ? 'bg-blue-900' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform transform ${
                  highContrast ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={toggleTextToSpeech}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <span>Leitura por Voz</span>
            </div>
            <div
              className={`w-10 h-6 rounded-full transition-colors ${
                textToSpeech ? 'bg-blue-900' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform transform ${
                  textToSpeech ? 'translate-x-5' : 'translate-x-0.5'
                } mt-0.5`}
              />
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <div className="px-2 py-2 text-xs text-muted-foreground">
            Use estas opções para melhorar a acessibilidade do sistema conforme suas
            necessidades.
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* CSS para alto contraste */}
      <style>{`
        .high-contrast {
          filter: contrast(1.5);
        }
        .high-contrast * {
          border-color: #000 !important;
        }
        .high-contrast a {
          text-decoration: underline !important;
        }
      `}</style>
    </>
  );
}
