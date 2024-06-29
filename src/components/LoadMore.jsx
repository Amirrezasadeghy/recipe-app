import React from "react";

const LoadMore = ({ onLoadMore, onSeeLess, canLoadMore, canSeeLess }) => (
  <div className="flex justify-center">
    {canSeeLess && (
      <button
        onClick={onSeeLess}
        className="bg-white hover:bg-amber-500 transition-all text-black p-3 mx-2 rounded-full border-solid border-x-2 border-y-2 border-black"
      >
        See Less
      </button>
    )}
    {canLoadMore && (
      <button
        onClick={onLoadMore}
        className="bg-white hover:bg-amber-500 transition-all text-black p-3 mx-2 rounded-full border-solid border-x-2 border-y-2 border-black"
        >
        See More
      </button>
    )}
  </div>
);

export default LoadMore;
