import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="cube">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face right"></div>
        <div className="face left"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
};

export default Loader;
