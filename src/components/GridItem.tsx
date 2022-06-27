import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  url: string;
  image: string;
};

const GridItem = ({ title, url, image }: Props) => {
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
        <a className="text-xl mb-2">{title}</a>
        <Image src={image} width="100%" height="100%" objectFit="contain" />
      </motion.div>
    </Link>
  );
};

export default GridItem;
