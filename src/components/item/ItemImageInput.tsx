import React, { useState } from 'react';
import { Item } from '../../interfaces/Item';
import Upload from '../Upload';

type Props = {
  item: Item;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ItemImageInput = ({ item, setImage }: Props) => {
  const [img, setImg] = useState(item.image);

  return (
    <>
      <Upload setImage={setImg} />

      <input
        type="text"
        value={img}
        defaultValue={item.image}
        className="text-black p-3 w-full"
        name="image"
        onChange={(e) => setImage(e.target.value)}
      />
    </>
  );
};

export default ItemImageInput;
