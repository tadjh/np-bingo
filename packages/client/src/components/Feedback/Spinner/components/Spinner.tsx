import clsx from 'clsx';
import SpinnerIcon from '../../../../assets/icons/Spinner';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

export default function SpinnerModal({
  id = 'spinner',
  isLoading = true,
  className = 'h-10 w-10',
  ...props
}: SpinnerProps): JSX.Element | null {
  if (!isLoading) return null;
  return (
    <SpinnerIcon className={clsx('animate-spin text-blue-500', className)} />
  );
}
