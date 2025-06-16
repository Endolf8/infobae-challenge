import iconStars from '@/public/assets/icon-starts.svg';
import Img from '../Img';

interface Props {
  title?: string;
  description?: string;
}

const EmptyContent: React.FC<Props> = ({
  title = 'No hay resultados',
  description = 'Intenta cambiar los términos de búsqueda.',
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 text-center">
      <Img src={iconStars} className=" mx-auto" alt="Icono de estrellas" />
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl">{title}</h2>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EmptyContent;
