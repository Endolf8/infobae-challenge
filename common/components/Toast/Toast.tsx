'use client';
import iconInfo from '@/public/assets/icon-toast-info.svg';
import iconSuccess from '@/public/assets/icon-toast-success.svg';
import iconWarning from '@/public/assets/icon-toast-warning.svg';
import iconError from '@/public/assets/icon-toast-error.svg';
import Img from '../Img';
import { Toaster } from 'sonner';

interface Props {}

const Toast: React.FC<Props> = () => {
  return (
    <Toaster
      position="top-right"
      closeButton={false}
      duration={6000}
      richColors
      icons={{
        info: <Img className="w-lg h-lg" src={iconInfo} alt="info" />,
        success: <Img className="w-lg h-lg" src={iconSuccess} alt="success" />,
        warning: <Img className="w-lg h-lg" src={iconWarning} alt="warning" />,
        error: <Img className="w-lg h-lg" src={iconError} alt="error" />,
      }}
      className="w-[450px] !bg-red-500"
    />
  );
};

export default Toast;
