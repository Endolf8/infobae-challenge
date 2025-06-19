import { NotebookPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../Button/Button';

const ButtonCreate = () => {
  const router = useRouter();
  return (
    <Button
      handleClick={() => router.push('/generator')}
      className="text-p1 rounded-full flex items-center justify-center !bg-white h-28 w-28 animate__animated animate__zoomIn shadow-e4"
    >
      <NotebookPen className="h-16 w-16" />
    </Button>
  );
};

export default ButtonCreate;
