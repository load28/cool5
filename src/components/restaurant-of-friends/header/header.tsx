import { PropsWithoutRef } from 'react';
import './Header.scss';

interface HeaderProps {
  setSearchKeyword: (keyword: string) => void;
}

const Header = ({ setSearchKeyword }: PropsWithoutRef<HeaderProps>) => {
  const onKeyworkdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
 
  return (
    <>
      <div className="sticky top-0 flex flex-col bg-white gap-6 lg:flex-row lg:justify-between items-center px-4 py-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:border-b-2 after:border-gray-700 after:min-w-full">
        <span className="w-full text-left text-4xl tracking-tight color-gray-700 lg:leading-8">
          Share place
        </span>
        <span className="input-wrap w-full lg:max-w-fit">
          <input placeholder="search" onChange={onKeyworkdChange} />
        </span>
      </div>
    </>
  );
};

export default Header;
