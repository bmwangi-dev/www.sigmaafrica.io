type LogoType = 'mark' | 'fullWhite' | 'fullColor';
interface LogoProps {
  type?: LogoType;
  className?: string;
  alt?: string;
}

const LogoComponent = ({
  type = 'fullColor',
  className = '',
  alt = 'Sigma Africa Logo',
}: LogoProps) => {
  let src = '';

  switch (type) {
    case 'mark':
      src = '/images/logo.png';
      break;
    case 'fullWhite':
      src = '/images/logo-with-text-white.png';
      break;
    case 'fullColor':
    default:
      src = '/images/logo-with-text-colored.png';
      break;
  }

  return <img src={src} alt={alt} className={className} />;
};

export default LogoComponent;
