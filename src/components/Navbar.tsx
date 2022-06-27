import Link from 'next/link';
import React, { useState } from 'react';
import { GiCharacter, GiHamburgerMenu, GiHeartNecklace } from 'react-icons/gi';
import { MdLocationOn } from 'react-icons/md';
import { IoIosPeople } from 'react-icons/io';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';
import { FaJournalWhills } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '@fontsource/barriecito';

const menu = [
  {
    url: 'characters',
    label: 'Characters',
    icon: <GiCharacter className="text-[#A29438]" />,
  },
  {
    url: 'items',
    label: 'Items',
    icon: <GiHeartNecklace className="text-[#A29438]" />,
  },
  {
    url: 'npcs',
    label: "Npc's",
    icon: <IoIosPeople className="text-[#A29438]" />,
  },
  {
    url: 'locations',
    label: 'Locations',
    icon: <MdLocationOn className="text-[#A29438]" />,
  },
  {
    url: 'recaps',
    label: 'Recaps',
    icon: <FaJournalWhills className="text-[#A29438]" />,
  },
];

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const [searchActive, setSearchActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <nav
        className="px-4 flex justify-between h-16"
        style={{
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <ul className="flex items-center z-50">
          <li className="text-4xl text-[#A29438]">
            <Link href="/">
              <a
                style={{
                  fontFamily: '"Barriecito", cursive',
                }}
              >
                Misfits
              </a>
              {/* <Image src={Logo} height={55} objectFit="contain" /> */}
            </Link>
          </li>
        </ul>

        <ul className="hidden sm:flex items-center text-white space-x-5 text-lg">
          {menu.map((item) => (
            <li
              className={
                router.asPath.includes(item.url)
                  ? 'border-b border-[#A29438]'
                  : ''
              }
            >
              <Link href={`/${item.url}/1`}>
                <a className="flex items-center justify-center space-x-2">
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex sm:hidden text-white text-lg items-center z-50">
          <li>
            <button>
              <GiHamburgerMenu onClick={toggleMenu} />
            </button>
          </li>
        </ul>

        <ul className="hidden sm:flex items-center">
          {true === true && (
            <li className="h-10 w-10 text-white text-4xl">
              <button onClick={() => setSearchActive(true)}>
                <BiSearch />
              </button>
            </li>
          )}

          {/* {searchActive && (
          <li className="">
            <input type="search" />
          </li>
        )} */}
        </ul>
      </nav>

      {showMenu && (
        <motion.div
          initial={{
            // opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: '100%',
            transition: {
              duration: 0.8,
            },
          }}
          className="absolute top-0 left-0 w-full h-screen text-white text-5xl z-40"
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
          }}
        >
          <ul className=" space-y-5 mt-20">
            {menu.map((item, i) => (
              <motion.li
                initial={{
                  marginLeft: -1000,
                }}
                animate={{
                  marginLeft: 0,
                  transition: {
                    duration: 1,
                    delay: 0.05 + i * 0.1,
                  },
                }}
                className={
                  router.asPath.includes(item.url)
                    ? 'border-b border-[#A29438]'
                    : ''
                }
              >
                <Link href={`/${item.url}/1`}>
                  <a
                    className="flex items-center justify-center space-x-2"
                    onClick={toggleMenu}
                  >
                    <span>{item.label}</span>
                  </a>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
