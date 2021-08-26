import { ButtonVariants } from '..';
export function useButton(variant: ButtonVariants, disabled: boolean) {
  const style = (disabled && 'disabled') || variant;

  /**
   * Button style based on variant or disabled
   * @param variant
   * @returns string
   */
  const buttonStyle = (): string => {
    switch (style) {
      case 'disabled':
        return 'disabled:opacity-50 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:text-gray-800 dark:disabled:text-gray-400 disabled:shadow-none disabled:cursor-default disabled:translate-y-0';
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-300 dark:hover:bg-blue-400 text-white dark:text-black text-opacity-90 dark:text-opacity-90';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 dark:bg-green-300 dark:hover:bg-green-400 text-white dark:text-black text-opacity-90 dark:text-opacity-90';
      default:
        return 'text-blue-600 dark:text-blue-300 hover:text-white dark:hover:text-black hover:text-opacity-90 dark:hover:text-opacity-90 hover:bg-blue-700 dark:hover:bg-blue-400';
    }
  };

  return [buttonStyle];
}
