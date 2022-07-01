import Image from 'next/image';
import React, { useState } from 'react';
import { SettingSidebar, WithSidebar } from '../../components/page';

const timeline = [
  {
    background:
      'linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(241,255,104,1) 50%)',
    width: '5%',
  },
  {
    inner: true,
    title: 'The Founding',
    points: [
      {
        position: 1,
        text: 'The Luxon was born at the creation point of the universe. Other lights formed around this Light, but those lights settled as stars; the Luxon resisted that urge to burn and instead traveled, seeking self-knowledge. The Luxon traveled without much comprehension, knowing only that they were light in the darkness, and occasionally passed other things of light.',
      },
    ],
    text: '<h3 className="text-xl">The Founding</h3> \
          <p> \
            The Prime Deities arrive in a chaotic world roamed by elemental \
            titans. \
            <br /> \
            They create humans, elves, dwarves and other races, and lend them \
            magic. \
          </p> \
\
          <p>Metallic Dragons are created to protect them.</p>',
    background: 'rgba(241,255,104,1)',
    color: 'black',
    width: '10%',
  },
  {
    inner: false,
    text: '<p>The Prime Deities defeat the primordials and the Betrayer Gods.<br />The world is named Exandria.</p>',
    background: 'transparent',
    width: '1%',
  },
  {
    inner: true,
    text: '',
    background: 'rgba(120,255,104,1)',
    width: '32%',
  },
  {
    inner: false,
    text: '',
    background: 'transparent',
    width: '1%',
  },
  {
    inner: true,
    text: '',
    background: 'rgba(255,104,104,1)',
    width: '10%',
  },
  {
    inner: false,
    text: '',
    background: 'transparent',
    width: '1%',
  },
  {
    inner: true,
    text: '',
    background: 'rgba(104,153,255,1)',
    width: '35%',
  },
  {
    background:
      'linear-gradient(270deg, rgba(2,0,36,0) 0%, rgba(104,153,255,1) 50%)',
    width: '5%',
  },
];

const defaultText =
  'Move over an point in the timeline to get more information.';

type Props = {};

const setting = (props: Props) => {
  const [text, setText] = useState(defaultText);

  return (
    <WithSidebar title="Calendar of Exandria" sidebar={<SettingSidebar />}>
      <h1 className={`text-4xl mb-5 text-[#B29438]`}>Timeline of Exandria</h1>

      <div>
        <div className="flex w-full">
          {timeline.map((time) => (
            <div
              style={{
                background: time.background,
                width: time.width,
                color: 'black',
                position: 'relative',
                height: '100px',
              }}
            >
              {time.points?.map((point) => (
                <div
                  className="cursor-pointer hover:scale-150"
                  style={{
                    position: 'absolute',
                    left: `${point.position}%`,
                    top: `5%`,
                    width: '10px',
                    height: '10px',
                    background: 'black',
                    borderRadius: '100%',
                  }}
                  onMouseOver={() => setText(point.text)}
                  onMouseOut={() => setText(defaultText)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-white">
          <p>{text}</p>
        </div>
      </div>

      {/* <div className="relative w-full h-96">
        <Image src="/images/timeline.webp" layout="fill" objectFit="contain" />
      </div> */}
    </WithSidebar>
  );
};

export default setting;
