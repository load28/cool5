import { useSearchKeywordStore } from '@core/stores/search-keyword';
import './Header.scss';
import UserIcon from './ui/UserIcon';
import { Input } from '@components/ui/input.tsx';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const updateSearchKeyword = useSearchKeywordStore((state) => state.updateSearchKeyword);

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchKeyword(e.target.value);
  };

  return (
    <>
      <div className="sticky top-0 flex flex-col gap-6 lg:flex-row lg:justify-between items-center px-4 py-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Share Place</h1>
        <div className="flex items-center gap-x-4">
          <span className="input-wrap w-full lg:max-w-fit">
            <Input placeholder="search" onChange={onKeywordChange} />
          </span>
          <UserIcon />
        </div>
      </div>
    </>
  );
};

export default Header;
