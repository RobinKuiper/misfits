import React from 'react';
import { Item } from '../interfaces/Item';

type Props = {
  item: Item;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const ItemTitleInput = ({ item, setTitle }: Props) => {
  return (
    <input
      type="text"
      defaultValue={item.name}
      name="name"
      // className="text-black p-3 w-full mb-5"
      className={`text-4xl mb-5 bg-transparent ${
        item.published ? 'text-[#B29438]' : 'text-red-600'
      }`}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default ItemTitleInput;
