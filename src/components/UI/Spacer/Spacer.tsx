import { SpacerProps } from './SpacerTypes';

export const Spacer = (props: SpacerProps) => {
  const { className } = props;
  return <div className={`${className} my-2`} />;
};

export default Spacer;
