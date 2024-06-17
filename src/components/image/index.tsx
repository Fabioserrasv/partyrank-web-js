// components/Image.tsx
import NextImage, { ImageProps } from 'next/image';

const customLoader = ({ src }: { src: string }): string => {
  return src;
};

const Image = (props: ImageProps) => {
  return (
    <NextImage
      {...props}
      loader={customLoader}
    />
  );
};

export default Image;
