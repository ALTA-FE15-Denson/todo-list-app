import React, { FC } from "react";

interface CardProps {
  id: string;
  content?: string;
  date?: string;
  description?: string;
  onClick?: () => void; // New onClick callback
  onRemove?: () => void; // New onRemove callback
  onComplete?: () => void; // New onComplete callback
}

const Card: FC<CardProps> = ({ id, content, date, description, onClick, onRemove, onComplete }) => {

  return (
    <div id={id} className="w-full p-4 flex justify-between border-b-2 border-gray-50 text-black hover:text-black">
      <button onClick={onComplete} className="p-2 w-0.5 h-0.5 lg:w-2 lg:h-2 rounded-full mr-3 mt-2 border-gray-300 focus:border-red-500 hover:border-red-500"></button>
      <a href={`/detail/${id}`} className="mr-auto ">
        <h1 className="text-base lg:text-xl text-black font-bold">{content}</h1>
        <p className="text-sm text-gray-400">{date}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </a>
      <div>
        <button className="border-none hover:border-none hover:outline-none focus:border-none focus:outline-none p-2 lg:p-5" onClick={onClick}>
          <img
            src="../../public/pencil.png"
            alt=""
            className="w-4 h-4 lg:w-5 lg:h-5 transition transform hover:-translate-y-1"
          />
        </button>
        <button className="border-none hover:border-none hover:outline-none focus:border-none focus:outline-none p-2 lg:p-5" onClick={onRemove}>
          <img
            src="../../public/trash.png"
            alt=""
            className="w-4 h-4 lg:w-5 lg:h-5 transition transform hover:-translate-y-1"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
