import React, { useRef, useState, useEffect } from 'react';

// Generic type parameter for the data items
interface SearchMainProps<T> {
  className?: string;
  placeholder?: string;
  data?: T[];
  onSearch?: (results: T[]) => void;
  searchKeys?: (keyof T & string)[];
}

function SearchMain<T extends Record<string, unknown>>({ 
  className = '', 
  placeholder = "Search or type command...",
  data = [],
  onSearch,
  searchKeys = ['name', 'description'] as (keyof T & string)[]
}: SearchMainProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Search functionality
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      if (onSearch) onSearch([]);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    
    // Match items that contain the query in specified keys
    const filteredItems = data.filter(item => {
      return searchKeys.some(key => {
        const value = item[key];
        return typeof value === 'string' && value.toLowerCase().includes(lowercasedQuery);
      });
    });

    setSuggestions(filteredItems);
    
    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(filteredItems);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow up/down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      if (suggestions[activeIndex]) {
        handleSelectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion: T) => {
    if (typeof suggestion.name === 'string') {
      setQuery(suggestion.name);
    }
    setSuggestions([suggestion]);
    setIsOpen(false);
    if (onSearch) {
      onSearch([suggestion]);
    }
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 dark:bg-yellow-700">{part}</span> : 
        <span key={index}>{part}</span>
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={() => query && setIsOpen(true)}
            placeholder={placeholder}
            className={`dark:bg-dark-900 h-12 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`}
          />

          <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
            <span> ⌘ </span>
            <span> K </span>
          </button>
        </div>
      </form>
      {/* Dropdown for search suggestions */}
      {isOpen && suggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  index === activeIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => handleSelectSuggestion(suggestion)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="font-semibold text-gray-900 dark:text-white/90">
                  {typeof suggestion.name === 'string' ? highlightMatch(suggestion.name, query) : ''}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {typeof suggestion.description === 'string' ? highlightMatch(suggestion.description, query) : ''}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchMain; 