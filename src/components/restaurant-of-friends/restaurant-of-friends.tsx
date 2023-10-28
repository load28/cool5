import { useState } from 'react';
import Header from './header/header.tsx';
import List from './list/list.tsx';

const RestaurantOfFriends = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className="sm:max-w-4xl px-6 w-full bg-white">
      <Header setSearchKeyword={setSearchKeyword}></Header>
      <div className="mt-4 lg:mt-16"></div>
      <div className="mt-4 lg:mt-16">
        <List searchKeyword={searchKeyword}></List>
      </div>
    </div>
  );
};

export default RestaurantOfFriends;
