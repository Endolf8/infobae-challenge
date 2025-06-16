import { useEffect, useRef, useState } from 'react';
import cn from '@/common/utils/classNames';
import styles from './Input.module.css';

const LABEL_STYLE = {
  base: 'text-xs mb-xs max-w-full whitespace-normal text-left',
  floatingOnTop: 'top-0 left-0 text-n4',
  floatingInsideInput:
    'top-[calc(2.5*var(--spacing-m)+var(--spacing-xs))] left-m text-n5 font-medium cursor-text',
  disabled: '!cursor-default',
};

const ABSOLUTE_CHILDREN_STYLE = 'gap-xs';

const INPUT_STYLE = {
  base: 'text-sm rounded-sm border-n1 px-md py-sm placeholder:text-n4 text-n4', // TIP: For only bottom border use: 'rounded-none border-0 border-b'
  hover: 'hover:border-n4',
  focus: cn(styles.inputFocus, 'focus:border-p1 focus:shadow-colored'),
  disabled: 'disabled:text-n3 disabled:border-n4 disabled:bg-n1',
  error: '!border-fe1 !shadow-ring-error',
  success: '!border-fs1 !shadow-ring-success',
};

export interface Props
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'disabled' | 'onChange'
  > {
  name: string;
  value?: string;
  type?: string;
  isDisabled?: boolean;
  handleChange: (name: string, value: string) => void;
  containerClassName?: string;
  className?: string;
  inputClassName?: string;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  successMessage?: string;
  childrenStart?: React.ReactNode;
  childrenEnd?: React.ReactNode;
  showFloatingLabel?: boolean;
  externalRef?: React.RefObject<HTMLInputElement>;
  transparent?: boolean;
  labelClassName?: string;
}

const Input: React.FC<Props> = ({
  name,
  value,
  type = 'text',
  isDisabled = false,
  handleChange,
  onFocus = () => {},
  onBlur = () => {},
  containerClassName = '',
  className = '',
  inputClassName = '',
  label = '',
  placeholder = '',
  errorMessage: error = '',
  successMessage = '',
  childrenStart,
  childrenEnd,
  showFloatingLabel = false, // Change to true to show floating label as default behavior
  externalRef,
  transparent = true,
  labelClassName = '',
  ...props
}) => {
  const [floatLabel, setFloatLabel] = useState(showFloatingLabel); // True when label is floating on top of input. False when label is inside input.
  const ref = useRef<HTMLInputElement>(null);

  const inputRef = externalRef || ref;

  useEffect(() => {
    setFloatLabel(!!value);
  }, [value]);

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <span
          className={cn(
            'block relative z-10 w-max transition-all', // Base
            LABEL_STYLE.base, // Base custom
            isDisabled && LABEL_STYLE.disabled, // Disabled
            showFloatingLabel && !floatLabel // Floating label
              ? LABEL_STYLE.floatingInsideInput
              : LABEL_STYLE.floatingOnTop,
            labelClassName // Custom
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
        </span>
      )}

      <div
        className={cn(
          'relative flex flex-row flex-nowrap justify-between items-center w-full',
          className
        )}
        onClickCapture={(e) => isDisabled && e.stopPropagation()}
      >
        <div
          className={cn(
            'absolute left-2 h-full w-max flex flex-row items-center z-10',
            ABSOLUTE_CHILDREN_STYLE
          )}
        >
          {childrenStart}
        </div>
        <input
          ref={inputRef}
          name={name}
          value={value}
          type={type}
          disabled={isDisabled}
          placeholder={showFloatingLabel ? '' : placeholder}
          className={cn(
            styles.input, // Base
            'block w-full h-max relative border outline-none transition-shadow', // Base
            inputClassName, // Custom
            INPUT_STYLE.base, // Base custom
            INPUT_STYLE.hover, // Hover
            INPUT_STYLE.focus, // Focus
            INPUT_STYLE.disabled, // Disabled
            transparent ? 'bg-transparent' : 'bg-n0', // Transparent
            error ? INPUT_STYLE.error : '',
            successMessage ? INPUT_STYLE.success : ''
          )}
          onMouseDown={(e) => {
            if (props.readOnly) {
              e.preventDefault();
            }
          }}
          onFocus={(e) => {
            onFocus(e);
            setFloatLabel(true);
          }}
          onBlur={(e) => {
            onBlur(e);
            setFloatLabel(!!e.target.value);
          }}
          {...props}
          onChange={(e) => handleChange(name, e.target.value)}
        />
        <div
          className={cn(
            'absolute right-2 h-full w-max flex flex-row items-center',
            ABSOLUTE_CHILDREN_STYLE
          )}
        >
          {childrenEnd}
        </div>
      </div>
    </div>
  );
};

export default Input;
