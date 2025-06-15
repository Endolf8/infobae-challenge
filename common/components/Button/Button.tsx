import { ButtonHTMLAttributes, FormEvent, useEffect, useState } from 'react';
import cn from '@/common/utils/classNames';
import LoadingSpinner from '@/common/components/LoadingSpinner';

type Size = '' | 'tiny' | 'small' | 'medium' | 'large' | 'xLarge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: (_e: FormEvent<HTMLButtonElement>) => any;
  label?: string;
  sizeComponent?: Size;
  className?: string;
  secondary?: boolean;
  isLoading?: boolean;
  disabledLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  loadingText?: string;
}

const Button = ({
  children,
  handleClick = () => {},
  label,
  sizeComponent = 'xLarge',
  secondary = false,
  className = '',
  disabled,
  loadingText,
  isLoading,
  disabledLoading,
  ...props
}: Props) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      setTimeout(() => {
        setShowLoading(false);
      }, 500);
    }
  }, [isLoading]);

  const handleAsyncClick = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabledLoading) setShowLoading(true);
    await handleClick(e);
    setShowLoading(false);
  };

  const baseStyles =
    'font-bold rounded-[0.625rem] h-15 px-6 py-3 flex items-center justify-center gap-2 cursor-pointer border-none transition-transform duration-100 active:scale-90 disabled:cursor-not-allowed disabled:grayscale';

  const sizeStyles: Record<Size, string> = {
    tiny: 'px-4 py-0 text-sm w-max',
    small: 'px-2 py-1 text-sm w-max',
    medium: 'w-[70%] px-4 py-2',
    large: 'w-[90%] px-4 py-2',
    xLarge: 'w-full px-4 py-2',
    '': '',
  };

  const variantStyles = secondary
    ? 'bg-[var(--colors-neutrals-n1)] text-[var(--colors-primary-p1)]'
    : 'bg-[var(--colors-primary-p2)] text-[var(--colors-primary-p1)]';

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[sizeComponent],
        variantStyles,
        className
      )}
      onClick={handleAsyncClick}
      disabled={showLoading || disabled}
      {...props}
    >
      {showLoading ? (
        <div className="flex gap-2 items-center">
          <h6 className="font-semibold">{loadingText}</h6>
          <LoadingSpinner size="1.5rem" />
        </div>
      ) : (
        children || label
      )}
    </button>
  );
};

export default Button;
