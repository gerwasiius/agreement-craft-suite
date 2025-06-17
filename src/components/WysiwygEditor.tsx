
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface WysiwygEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function WysiwygEditor({ content, onChange }: WysiwygEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (editorRef.current && isReady) {
      editorRef.current.innerHTML = content;
    }
  }, [content, isReady]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const placeholderValue = e.dataTransfer.getData("text/plain");
    
    if (placeholderValue && editorRef.current) {
      // Get the current selection/cursor position
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        
        // Create a span element for the placeholder
        const placeholderSpan = document.createElement('span');
        placeholderSpan.textContent = placeholderValue;
        placeholderSpan.className = 'bg-corporate-yellow/20 border border-corporate-yellow/50 px-1 rounded text-corporate-black font-medium';
        
        // Insert the placeholder at cursor position
        range.deleteContents();
        range.insertNode(placeholderSpan);
        
        // Move cursor after the inserted placeholder
        range.setStartAfter(placeholderSpan);
        range.setEndAfter(placeholderSpan);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // If no selection, append at the end
        const placeholderSpan = document.createElement('span');
        placeholderSpan.textContent = placeholderValue;
        placeholderSpan.className = 'bg-corporate-yellow/20 border border-corporate-yellow/50 px-1 rounded text-corporate-black font-medium';
        editorRef.current.appendChild(placeholderSpan);
      }
      
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      onChange(editorRef.current.innerHTML);
    }
  };

  const toolbarButtons = [
    { command: 'bold', label: 'B', title: 'Bold' },
    { command: 'italic', label: 'I', title: 'Italic' },
    { command: 'underline', label: 'U', title: 'Underline' },
    { command: 'insertUnorderedList', label: '•', title: 'Lista' },
    { command: 'insertOrderedList', label: '1.', title: 'Numerisana lista' },
    { command: 'justifyLeft', label: '⭤', title: 'Levo' },
    { command: 'justifyCenter', label: '⭢', title: 'Centar' },
    { command: 'justifyRight', label: '⭠', title: 'Desno' }
  ];

  const formatSelect = [
    { value: 'p', label: 'Normalni tekst' },
    { value: 'h1', label: 'Naslov 1' },
    { value: 'h2', label: 'Naslov 2' },
    { value: 'h3', label: 'Naslov 3' }
  ];

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const format = e.target.value;
    if (format) {
      execCommand('formatBlock', `<${format}>`);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 border-b border-gray-300">
        <select 
          onChange={handleFormatChange}
          className="px-2 py-1 border border-gray-300 rounded text-sm bg-white min-w-[120px]"
        >
          <option value="">Stil teksta</option>
          {formatSelect.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        
        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        
        {toolbarButtons.map((btn) => (
          <Button
            key={btn.command}
            type="button"
            variant="outline"
            size="sm"
            title={btn.title}
            onClick={() => execCommand(btn.command)}
            className="h-8 w-8 p-0"
          >
            {btn.label}
          </Button>
        ))}
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto focus:outline-none focus:border-corporate-yellow"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
