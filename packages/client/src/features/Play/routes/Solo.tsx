import Play, { PlayProps } from './Play';

export interface SoloProps extends PlayProps {}

export function Solo({ ...props }: SoloProps) {
  return <Play gamemode={'solo'} {...props} />;
}
