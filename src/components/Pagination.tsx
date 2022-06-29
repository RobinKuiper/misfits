import Link from 'next/link';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

type Props = {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = (props: Props) => {
  const pages = [];

  for (let i = 0; i < props.totalPages; i++) {
    pages.push(i + 1);
  }

  return (
    <div className="sticky bottom-28 flex items-center justify-center space-x-5 text-xl">
      {props.currentPage > 1 ? (
        <div>
          <button onClick={() => props.setPage(props.currentPage - 1)}>
            <MdArrowBackIos />
          </button>
        </div>
      ) : (
        <span className="text-zinc-500">
          <MdArrowBackIos />
        </span>
      )}
      {pages.map((page) => (
        <div>
          {page === props.currentPage ? (
            <span className="text-zinc-500">{page}</span>
          ) : (
            <button onClick={() => props.setPage(page)}>{page}</button>
          )}
        </div>
      ))}
      {props.totalPages > props.currentPage ? (
        <div>
          <button onClick={() => props.setPage(props.currentPage + 1)}>
            <MdArrowForwardIos />
          </button>
        </div>
      ) : (
        <span className="text-zinc-500">
          <MdArrowForwardIos />
        </span>
      )}
    </div>
  );
};

export default Pagination;
