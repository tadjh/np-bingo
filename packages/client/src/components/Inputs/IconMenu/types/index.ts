export type MenuDirection = 'up' | 'right' | 'down' | 'left';

export interface IconMenuProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  direction?: MenuDirection;
  open?: boolean;
}
