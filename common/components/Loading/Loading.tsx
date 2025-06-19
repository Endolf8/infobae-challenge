import React from 'react';
import Img from '../Img';
import stars from '@/public/assets/icon-stars.svg';

const Loading = ({ title = 'Cargando' }: { title: string }) => {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4 text-center animate__animated animate__zoomIn ">
      <Img
        src={stars}
        alt="Cargando..."
        className="animate__animated animate__pulse animate__infinite"
      />
      <h1>{title}</h1>
    </div>
  );
};

export default Loading;
