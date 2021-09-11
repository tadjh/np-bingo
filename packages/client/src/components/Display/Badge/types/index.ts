export type BadgeColors = 'gray' | 'blue' | 'gradient' | 'stepped';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: BadgeColors;
  description?: string;
  isHovered?: boolean;
  disabled?: boolean;
  offset?: number;
}
