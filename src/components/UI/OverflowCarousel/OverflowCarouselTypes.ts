import { ReactNode, RefObject } from 'react';

export type ItemsContainerProps = {
  activeItem?: number;
  scrollCarousel?: (string) => void;
  visibleContainerWidth?: number;
  itemsWrapperStyles?: { transform: string };
  cardContainerRef?: RefObject<HTMLDivElement>;
  items?: ReactNode;
  fullWidth?: boolean | undefined;
  displayActionIcons?: boolean | undefined;
  rightDisabled?: boolean;
};

export type BasicOverflowCarousel = {
  // button type is import for accessibility
  heading?: ReactNode;
  id?: string;
  children: ReactNode[];
  cols?: number;
  firstColSpan?: number;
  actions?: ReactNode;
  defaultContainerWidth?: number;
  wrapperClasses?: string;
  actionsWrapperClasses?: string;
  headingWrapperClasses?: string;
  omitDivider?: boolean;
  defaultColWidth?: number;
  displayFullWidth?: boolean;
  displayActionIcons?: boolean;
  columnClasses?: string;
  appendage?: ReactNode;
  breakpoints?: number;
  omitMarginAuto?: boolean;
};

export type OverflowCarouselProps = BasicOverflowCarousel & ItemsContainerProps;
