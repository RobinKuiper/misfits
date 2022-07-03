import React from 'react';

type Props = {};

const test = (props: Props) => {
  return (
    <>
      <div className="absolute top-[306px] left-[1208px] w-1 h-10 bg-green-600 z-50"></div>
      <svg className="w-screen h-screen">
        <polyline points="1208,306 500,450 1000,450" fill="none" stroke="red" />
        <text x="500" y="500" className="text-lg">
          The Betrayer Gods quickly created Ghor Dranas.
        </text>
        <text x="550" y="550" className="text-lg">
          Torog's followers used the caves beneath Ghor Dranas as torture
          dungeons.
        </text>
      </svg>
    </>
  );
};

export default test;
