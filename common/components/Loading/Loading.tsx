import React from 'react';
import Img from '../Img';
import start from '@/public/assets/icon-starts.svg';

const Loading = () => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4 text-center animate__animated animate__zoomIn ">
      <Img
        src={start}
        alt="Cargando..."
        className="animate__animated animate__pulse animate__infinite"
      />
      <h1>Cargando</h1>
    </div>
  );
};

export default Loading;
