import Img from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CircleLoader } from 'react-spinners';

type Props = {
  title: string;
  url: string;
  image: string;
};

const GridItem = ({ title, url, image }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var img = new Image();
    img.onload = function () {
      setLoading(false);
    };
    img.src = image;
    if (img.complete) img.onload;
  }, []);

  return (
    <Link href={url}>
      <motion.div
        whileHover={{
          scale: 1.1,
        }}
        className="border-2 border-zinc-800 shadow rounded cursor-pointer flex flex-col px-3 py-2"
        style={{
          background: 'rgba(0,0,0,0.7)',
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <CircleLoader size="50px" color="#A2821A" />
          </div>
        ) : (
          <>
            <a className="text-xl mb-2">{title}</a>
            <Img src={image} width="100%" height="100%" objectFit="contain" />
          </>
        )}
      </motion.div>
    </Link>
  );
};

export default GridItem;
