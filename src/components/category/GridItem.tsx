import Img from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';
import { Item } from '../../interfaces/Item';

type Props = {
  item: Item;
  category: string;
};

const GridItem = ({ item, category }: Props) => {
  const [loading, setLoading] = useState(true);

  const { name, image, published } = item;

  useEffect(() => {
    if (!image) return setLoading(false);

    var img = new Image();
    img.onload = function () {
      setLoading(false);
    };
    img.src = image;
    if (img.complete) img.onload;
  }, []);

  return (
    <Link href={`/${category}/${item.slug}`}>
      <motion.div
        whileHover={{
          scale: 1.1,
        }}
        className="border-2 border-zinc-800 shadow rounded cursor-pointer flex flex-col px-3 py-2"
        style={{
          background: published ? 'rgba(0,0,0,0.7)' : '#f1f1f1',
          color: published ? 'white' : 'black',
        }}
      >
        <a className="text-xl mb-2">{name}</a>
        {loading ? (
          <div className="flex justify-center items-center">
            <CircleLoader size="50px" color="#A2821A" />
          </div>
        ) : (
          <>
            {image && (image.startsWith('/') || image.startsWith('http')) && (
              <Img src={image} width="100%" height="100%" objectFit="contain" />
            )}
          </>
        )}
      </motion.div>
    </Link>
  );
};

export default GridItem;
