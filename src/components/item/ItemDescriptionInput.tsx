import React from 'react';
import { Item } from '../../interfaces/Item';
import Tiptap from './Tiptap';

type Props = {
  item: Item;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

const ItemDescriptionInput = ({ item, setDescription }: Props) => {
  return (
    <div className="w-full">
      <Tiptap content={item.description} setText={setDescription} />
    </div>
  );
};

export default ItemDescriptionInput;
