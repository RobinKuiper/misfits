import React, { ReactElement, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

type Props = {
  children: ReactElement[] | ReactElement;
};

const initialDelay = 1;

const Layout = (props: Props) => {
  const [introWatched, setIntroWatched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIntroWatched(sessionStorage.getItem('intro') === 'yes');
  }, []);

  useEffect(() => {
    let loaded = 0;
    var gate = new Image();
    gate.onload = function () {
      loaded++;

      if (loaded === 2) setLoading(false);
    };
    gate.src = '/images/gate.webp';
    if (gate.complete) gate.onload;

    var gatebg = new Image();
    gatebg.onload = function () {
      loaded++;

      if (loaded === 2) setLoading(false);
    };
    gatebg.src = '/images/gatebg.webp';
    if (gatebg.complete) gatebg.onload;
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div
      className={`h-screen sm:overflow-hidden ${
        !introWatched && 'overflow-hidden'
      }`}
    >
      <motion.div
        className="relative"
        animate={{
          scale: introWatched ? 1 : [1, 8.5, 1],
          transition: {
            duration: 6,
            delay: initialDelay + 1.2,
          },
        }}
        onAnimationComplete={() => {
          sessionStorage.setItem('intro', 'yes');
        }}
      >
        {!introWatched && (
          <motion.div
            className="h-screen overflow-hidden"
            style={{
              background: 'url(/images/gatebg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              // backgroundAttachment: 'fixed',
              zIndex: 10,
            }}
            animate={{
              opacity: introWatched ? 0 : [1, 0, 0],
              display: introWatched ? 'none' : ['block', 'block', 'none'],
              transition: {
                delay: initialDelay + 1.2 + 3,
                duration: 3,
              },
            }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-screen overflow-hidden"
              animate={{
                top: '100%',
                left: '-1.8%',
                transition: {
                  duration: 3,
                  delay: initialDelay,
                },
              }}
            >
              <div
                className="h-full"
                style={{
                  background: 'url(/images/gate.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 15,
                  // backgroundAttachment: 'fixed',
                }}
              ></div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          // className="flex-1 flex flex-col h-screen"
          className="flex items-center justify-center h-screen relative"
          initial={{
            display: introWatched ? 'flex' : 'none',
            opacity: introWatched ? 1 : 0,
          }}
          animate={{
            opacity: 1,
            display: 'flex',
            transition: {
              delay: initialDelay + 1.2 + 3,
              duration: 3,
            },
          }}
        >
          <div className="w-full h-full sm:w-[80%] sm:h-[80%] bg-gray-700 rounded-2xl z-10 relative flex flex-col">
            <Navbar />

            <div className="h-full">{props.children}</div>

            <div
              className="absolute top-0 left-0 w-full h-full -z-10"
              style={{
                background: 'url(/images/stonebg.webp)',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                boxShadow: '0px 0px 15px 5px #000',
                filter: 'blur(0px)',
              }}
            ></div>
          </div>

          <div
            className="absolute w-full h-screen"
            style={{
              // background: 'url(https://www.thewargamespot.com/wp-content/uploads/2017/03/dark-pattern-backgrounds-wallpaper-2.jpg)',
              background:
                'linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(/images/wasteland.webp)',
              backgroundSize: '100%',
              backgroundPosition: 'center center',
            }}
          ></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Layout;
