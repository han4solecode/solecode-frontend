import { useEffect, useState } from "react";
import LoadingAnimation from "../Elements/LoadingAnimation";

function Card(props) {
  const { cardTitle, data, cardFooter, isLoading } = props;

  return (
    <div className="w-64 h-40 rounded shadow-lg">
      <header className="bg-gray-800 text-white text-lg h-10 rounded-t-lg flex justify-center items-center">
        {cardTitle}
      </header>
      <div className="flex flex-col items-center justify-center mt-3">
        {isLoading ? (
          <span className="text-6xl">{data}</span>
        ) : (
          <LoadingAnimation></LoadingAnimation>
        )}
        {/* <span className="text-6xl">{data}</span> */}
        <span className="mt-1">{cardFooter}</span>
      </div>
    </div>
  );
}

export default Card;
