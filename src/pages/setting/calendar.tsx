import React from 'react';
import { SettingSidebar, WithSidebar } from '../../components/page';

const calendar = [
  {
    month: 'Horisal',
    days: 29,
    holidays: ['New Dawn (1st)', 'Hillsgold (27th)'],
  },
  {
    month: 'Misuthar',
    days: 30,
    holidays: ['Day of Challenging (7th)'],
  },
  {
    month: 'Dualahei',
    days: 30,
    holidays: ['Renewal Festival (13th)', "Wild's Grandeur (20th)"],
  },
  {
    month: 'Thunsheer',
    days: 31,
    holidays: ["Harvest's Rise (11th)", "Merryfrond's Day (31st)"],
  },
  {
    month: 'Unndilar',
    days: 28,
    holidays: ['Deep Solace (18th)', 'Zenith (26th)'],
  },
  {
    month: 'Brussendar',
    days: 31,
    holidays: ["Artisan's Faire (15th)", 'Elvendawn, or Midsummer (20th)'],
  },
  {
    month: 'Sydenstar',
    days: 32,
    holidays: ['Morn of Largesse (14th)', 'Highsummer (15th)'],
  },
  {
    month: 'Fessuran',
    days: 29,
    holidays: ["Harvest's Close (3rd)"],
  },
  {
    month: "Quen'pillar",
    days: 27,
    holidays: ['The Hazel Festival (10th)', "Civilization's Dawn (22nd)"],
  },
  {
    month: 'Cuersaar',
    days: 29,
    holidays: ['Night of Ascension (13th)', "Zan's Cup (21st)"],
  },
  {
    month: 'Duscar',
    days: 32,
    holidays: [
      'Barren Eve (2nd)',
      'Embertide (5th)',
      'Day of Heart and Hearth (16th)',
      "Winter's Crest (20th)",
    ],
  },
];

type Props = {};

const setting = (props: Props) => {
  return (
    <WithSidebar title="Calendar of Exandria" sidebar={<SettingSidebar />}>
      <h1 className={`text-4xl mb-5 text-[#B29438]`}>Calendar of Exandria</h1>

      <p>
        An Exandrian year lasts 328 days over the course of 11 months. Each day
        is 24 hours in length and the 7 days of the week are named Miresen,
        Grissen, Whelsen, Conthsen, Folsen, Yulisen, and Da'leysen. Yulisen and
        Da'leysen are considered to be the weekend for many people in Exandria.
      </p>

      <p>
        The calendar was established by elves in an ancient age, and the names
        of the days and months have survived to be used by civilizations
        throughout the world. The most commonly used, modern calendar counts the
        years starting with the year 0 PD (Post-Divergence).
      </p>

      <h2 className="text-2xl text-[#B29438]">Calendar</h2>

      <div
        className="p-2"
        style={{
          background: 'rgba(0,0,0,0.7)',
        }}
      >
        <table className="w-full">
          <tr className="text-left">
            <th>Month</th>
            <th>Days</th>
            <th>Holidays</th>
          </tr>

          {calendar.map((item) => (
            <tr className="border-b">
              <td>{item.month}</td>
              <td>{item.days}</td>
              <td className="py-2">
                <ul className="space-y-2">
                  {item.holidays.map((holiday) => (
                    <li>{holiday}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <h2 className="text-2xl text-[#B29438]">Seasons</h2>

      <p>
        <strong>Spring</strong> begins early in the month of{' '}
        <strong>Dualahei</strong>, officially starting on the 13th with the
        Renewal Festival.
      </p>

      <p>
        <strong>Summer</strong> begins in the middle of{' '}
        <strong>Unndilar</strong>, officially starting at noon on the 26th day
        known as the Zenith.
      </p>

      <p>
        <strong>Autumn</strong> begins early in <strong>Fessuran</strong>,
        marked by the Harvest's Close on the 3rd day.
      </p>

      <p>
        <strong>Winter</strong> begins on the 2nd day of <strong>Duscar</strong>
        , the Barren Eve.
      </p>
    </WithSidebar>
  );
};

export default setting;
