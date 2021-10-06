import clsx from 'clsx';

type Alerts = 'success' | 'caution' | 'failure' | 'none';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Alerts;
}
// TODO Alert.stories
export default function Alert({
  status = 'success',
  className,
  ...props
}: AlertProps) {
  const alertStyle = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600 active:bg-green-400 text-white';
      case 'caution':
        return 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-400 text-black';
      case 'failure':
        return 'bg-red-500 hover:bg-red-600 active:bg-red-400 text-white';
      default:
        return '';
    }
  };
  return (
    <div
      className={clsx('rounded-full w-2 h-2', alertStyle(), className)}
      {...props}
    />
  );
}
