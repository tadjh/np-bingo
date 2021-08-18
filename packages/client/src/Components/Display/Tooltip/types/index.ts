export type TooltipDirection = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  isHovered?: boolean;
  direction?: TooltipDirection;
  disabled?: boolean;
}
