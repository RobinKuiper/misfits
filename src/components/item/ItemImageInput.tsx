import React from 'react';
import { Item } from '../interfaces/Item';

type Props = {
  item: Item;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ItemImageInput = ({ item, setImage }: Props) => {
  return (
    <input
      type="text"
      defaultValue={item.image}
      className="text-black p-3 w-full"
      name="image"
      onChange={(e) => setImage(e.target.value)}
    />
  );
};

export default ItemImageInput;
