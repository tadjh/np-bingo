import { TooltipDirection } from '..';

export function useTooltip(direction: TooltipDirection) {
  /**
   * Styling for tooltip box
   * @returns string
   */
  function box(): string {
    switch (direction) {
      case 'top':
        return 'left-2/4 -translate-x-2/4 bottom-full mb-1.5'; // group-hover:animate-slide-top
      case 'right':
        return 'top-2/4 -translate-y-2/4 left-full ml-1.5'; // group-hover:animate-slide-right
      case 'bottom':
        return 'left-2/4 -translate-x-2/4 top-full mt-1.5'; // group-hover:animate-slide-bottom
      case 'left':
        return 'top-2/4 -translate-y-2/4 right-full mr-1.5'; // group-hover:animate-slide-left
      default:
        throw new Error('Error in tooltip switch');
    }
  }

  /**
   * Styling for tooltip arrow
   * @returns string
   */
  function arrow() {
    switch (direction) {
      case 'top':
        return 'left-2/4 -translate-x-2/4 top-full -translate-y-1.5 border-r border-b rounded-br-sm';
      case 'right':
        return 'top-2/4 -translate-y-2/4 right-full translate-x-1.5 border-b border-l rounded-bl-sm';
      case 'bottom':
        return 'left-2/4 -translate-x-2/4 bottom-full translate-y-1.5 border-l border-t rounded-tl-sm';
      case 'left':
        return 'top-2/4 -translate-y-2/4 left-full -translate-x-1.5 border-t border-r rounded-tr-sm';
      default:
        throw new Error('Error in tooltip switch');
    }
  }
  return [box, arrow];
}
