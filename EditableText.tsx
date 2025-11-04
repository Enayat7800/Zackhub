import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  isLiveEditMode: boolean;
  initialText: string;
  onSave: (newText: string) => void;
  tag?: 'h1' | 'h3' | 'p' | 'span';
  isTextarea?: boolean;
  className?: string;
  inputClassName?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  isLiveEditMode,
  initialText,
  onSave,
  tag = 'span',
  isTextarea = false,
  className,
  inputClassName
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const Tag = tag;

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setText(initialText);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTextarea && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSave();
    }
    if (e.key === 'Escape') {
        handleCancel();
    }
  };

  if (!isLiveEditMode) {
    return <Tag className={className}>{initialText || ' '}</Tag>;
  }
  
  if (isEditing) {
    const commonProps = {
      ref: inputRef as any,
      value: text,
      onChange: (e: any) => setText(e.target.value),
      onKeyDown: handleKeyDown,
      onBlur: handleSave,
      className: `w-full p-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-light-sidebar dark:bg-brand-sidebar text-light-text dark:text-brand-text ${inputClassName || ''}`
    };

    return (
      <div className="relative" onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
        {isTextarea ? (
          <textarea {...commonProps} rows={Math.max(4, text.split('\n').length)} />
        ) : (
          <input type="text" {...commonProps} />
        )}
        <div className="mt-2 flex gap-2">
          <button onMouseDown={handleSave} className="bg-green-500 text-white text-xs px-2 py-1 rounded">Save</button>
          <button onMouseDown={handleCancel} className="bg-gray-500 text-white text-xs px-2 py-1 rounded">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <Tag
      className={`${className} cursor-pointer transition-all duration-200 hover:outline-dashed hover:outline-2 hover:outline-offset-2 hover:outline-brand-primary min-h-[1em]`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsEditing(true);
      }}
      title="Click to edit"
    >
      {initialText || <span className="text-gray-400 italic">empty</span>}
    </Tag>
  );
};

export default EditableText;
