import { PropsWithChildren } from 'react';
import './float-button.scss';

interface FloatButtonProps {
  className?: string;
  onClick?: () => void;
}

const FloatButton: React.FC<PropsWithChildren<FloatButtonProps>> = ({ children, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default FloatButton;
