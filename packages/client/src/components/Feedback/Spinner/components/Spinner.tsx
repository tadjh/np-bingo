import clsx from 'clsx';
import SpinnerIcon from '../../../../assets/icons/Spinner';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  color?: 'white' | 'blue';
}

export default function SpinnerModal({
  id = 'spinner',
  isLoading = true,
  className = 'h-10 w-10',
  color = 'blue',
  ...props
}: SpinnerProps): JSX.Element | null {
  if (!isLoading) return null;

  const colorStyle = () => {
    switch (color) {
      case 'white':
        return 'text-white';
      case 'blue':
        return 'text-blue-500';
      default:
        throw new Error('Error in Spinner color');
    }
  };
  return (
    <SpinnerIcon className={clsx('animate-spin', colorStyle(), className)} />
  );
}
