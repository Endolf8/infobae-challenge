import Image, { ImageProps } from 'next/image';
import { basePath } from '../../constants';
import { useState } from 'react';

interface ImgProps extends ImageProps {
  ref?: React.Ref<HTMLImageElement>;
  Fallback?: React.ReactNode;
}
/** Wrapper for Next's Image component. Adds basepath to correctly locate static assets. */
const Img = ({ src, alt, ref, Fallback, ...props }: ImgProps) => {
  const [hasError, setHasError] = useState(false);

  console.log(hasError);

  if (hasError || !src) {
    return Fallback;
  }

  return (
    <Image
      ref={ref}
      src={
        typeof src === 'string' && src.startsWith('/assets')
          ? `${basePath}${src}`
          : src
      }
      onError={() => setHasError(true)}
      alt={alt}
      {...props}
    />
  );
};

export default Img;
