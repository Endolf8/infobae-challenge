import cn from '@/common/utils/classNames';

interface Props {
  size?: string;
  className?: string;
}

const LoadingSpinner: React.FC<Props> = ({ size, className }) => {
  return (
    <span
      className={cn(
        'block w-8 h-8 border-4 border-p1 rounded-full border-t-transparent animate-spin',
        className
      )}
      style={size ? { width: size, height: size } : {}}
    ></span>
  );
};

export default LoadingSpinner;
