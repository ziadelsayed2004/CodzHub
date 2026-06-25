import React, { useState, useEffect, useRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export default function CustomSelect({
  id,
  name,
  value,
  options,
  placeholder = 'Select...',
  error,
  onChange,
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Find currently selected option object
  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync active index with value when open state changes
  useEffect(() => {
    if (isOpen) {
      const idx = options.findIndex((opt) => opt.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    } else {
      setActiveIndex(-1);
    }
  }, [isOpen, value, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (val: string) => {
    // Mimic native change event structure
    onChange({
      target: {
        name,
        value: val
      }
    } as unknown as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex((prev) => (prev + 1) % options.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex((prev) => (prev - 1 + options.length) % options.length);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (activeIndex >= 0 && activeIndex < options.length) {
        handleSelect(options[activeIndex].value);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={wrapperRef} 
      className={`cz-select-wrapper ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger element */}
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className={`cz-select-trigger ${error ? 'error' : ''} ${!value ? 'is-placeholder' : ''}`}
      >
        <span className="cz-select-label-text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`material-symbols-outlined cz-select-chevron ${isOpen ? 'open' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="cz-select-dropdown" role="listbox">
          {/* Add a placeholder/reset option if not required, or if user wants to reset */}
          {placeholder && (
            <li
              role="option"
              aria-selected={value === ''}
              className={`cz-select-option cz-select-placeholder-option ${value === '' ? 'selected' : ''}`}
              onClick={() => handleSelect('')}
            >
              {placeholder}
            </li>
          )}
          
          {options.map((option, idx) => {
            const isSelected = option.value === value;
            const isActive = idx === activeIndex;

            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`cz-select-option ${isSelected ? 'selected' : ''} ${isActive ? 'active' : ''}`}
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <span className="cz-select-option-text">{option.label}</span>
                {isSelected && (
                  <span className="material-symbols-outlined cz-select-check-icon">
                    check
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
