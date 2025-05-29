import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface DropdownItemProps {
  tag?: 'a' | 'button';
  to?: string;
  children: ReactNode;
  className?: string;
  onItemClick?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  tag = 'button',
  to,
  children,
  className = '',
  onItemClick,
}) => {
  if (tag === 'a' && to) {
    return (
      <Link to={to} className={className} onClick={onItemClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onItemClick}>
      {children}
    </button>
  );
}; 