import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import { Item } from '../../interfaces/Item';
import Upload from '../Upload';

type Props = {
  item: Item;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  image: string;
};

const ItemImageInput = ({ item, setImage, image }: Props) => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const f = async () => {
      const result = await fetch('/api/files');
      setFiles(await result.json());
      setLoading(false);
    };
    f();
  }, [image]);

  return (
    <>
      <Upload setImage={setImage} />

      <div className="h-96 overflow-auto scrollbar">
        <ul>
          {!loading ? (
            files.map((file) => (
              <li
                className={`p-1 flex items-center space-x-5 cursor-pointer hover:bg-[#f1f1f1] hover:text-black ${
                  image === `/uploads/${file}` && 'bg-white text-black'
                }`}
                onClick={() => {
                  setImage(`/uploads/${file}`);
                }}
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={`/uploads/${file}`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="">{file}</span>
              </li>
            ))
          ) : (
            <div className="h-48 w-full flex justify-center items-center">
              <CircleLoader size="100px" color="#A2821A" />
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default ItemImageInput;
