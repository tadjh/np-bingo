import SpinnerIcon from '../../../../assets/icons/Spinner';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
}

export default function SpinnerModal({
  id = 'spinner',
  isLoading = false,
  ...props
}: SpinnerProps): JSX.Element | null {
  if (!isLoading) return null;
  return (
    <SpinnerIcon className="animate-spin h-10 w-10 text-blue-500 dark:text-blue-300" />
  );
}
