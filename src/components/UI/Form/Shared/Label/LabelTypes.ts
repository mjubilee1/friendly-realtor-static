export type LabelProps = Omit<React.HTMLProps<HTMLLabelElement | HTMLSpanElement>, 'ref'> & {
  useSpan?: boolean;
  hidden?: boolean;
};
