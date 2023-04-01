/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState, useEffect, useRef, createRef, RefObject, ReactNode } from 'react';
import { debounce } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Button, Divider, Icon } from '..';
import { ItemsContainerProps, OverflowCarouselProps } from './OverflowCarouselTypes';

const mobileBreakpoint = 576;
const defaultBreakPoints = {
  'break-1664': {
    6: 4,
    3: 2
  },
  'break-1120': {
    6: 2,
    3: 1
  }
};

function ItemsContainer({
  activeItem,
  scrollCarousel,
  visibleContainerWidth,
  itemsWrapperStyles,
  cardContainerRef,
  items,
  fullWidth,
  displayActionIcons,
  rightDisabled
}: ItemsContainerProps) {
  const visibleWidth = visibleContainerWidth || 0;
  const carouselVisibleContainerWidth = fullWidth ? { width: '100%' } : { width: `${visibleWidth / 16}rem` };
  const evenlySpaceItems = fullWidth ? 'justify-between' : '';
  return (
    <div className="flex items-center justify-between">
      {displayActionIcons ? (
        <div className="flex flex-col justify-center">
          <Button
            type="button"
            color="transparent"
            className="cursor-pointer"
            disabled={activeItem === 1}
            onClick={debounce(() => scrollCarousel?.('left'), 250)}
            aria-label="See previous items"
          >
            <Icon name="arrow-left" color="white" size="xlarge" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          color="black"
          aria-label="See previous items"
          className="flex text-white font-medium disabled:opacity-50"
          onClick={debounce(() => scrollCarousel?.('left'), 250)}
          icon={{
            name: 'arrow-left',
            color: 'white',
            position: 'left',
            size: 'medium'
          }}
        >
          Previous
        </Button>
      )}
      <div className="overflow-hidden px-4 relative whitespace-nowrap" role="region" aria-live="polite" style={carouselVisibleContainerWidth}>
        <div className={`flex transition-all duration-700 ${evenlySpaceItems}`} style={itemsWrapperStyles} ref={cardContainerRef}>
          {items}
        </div>
      </div>
      {displayActionIcons ? (
        <div className="flex flex-col justify-center">
          <Button
            type="button"
            color="none"
            className="cursor-pointer"
            disabled={rightDisabled}
            onClick={debounce(() => scrollCarousel?.('right'), 250)}
            aria-label="See next items"
          >
            <Icon name="arrow-right" color="white" size="xlarge" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          color="black"
          aria-label="See next items"
          className="flex text-white font-medium  disabled:opacity-50"
          disabled={rightDisabled}
          onClick={debounce(() => scrollCarousel?.('right'), 250)}
          icon={{
            name: 'arrow-right',
            color: 'white',
            position: 'right',
            size: 'medium'
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
}

function getCurrentBreakpoint(windowWidth, breakpointMap) {
  let currentBreakpoint = 0;
  Object.keys(breakpointMap).forEach((breakpoint) => {
    const breakPt = parseInt(breakpoint.split('-')[1]);
    if (windowWidth < breakPt) {
      currentBreakpoint = parseInt(breakpoint);
    }
  });
  return currentBreakpoint;
}
function getVisibleCols(currentBreakpoint, actualCols, breakpointMap) {
  // Haven't hit a breakpoint, return cols
  if (!currentBreakpoint) {
    return actualCols;
  }
  return breakpointMap[currentBreakpoint][`${actualCols}`];
}
function getPanelVisibleCount(windowWidth, visibleColumns, firstColSpan, activeItem, breakpointMap) {
  const currBreakpoint = getCurrentBreakpoint(windowWidth, breakpointMap);
  let visibleCount = visibleColumns;
  if (!currBreakpoint && firstColSpan && activeItem === 1) {
    visibleCount -= firstColSpan - 1;
  }
  return visibleCount;
}
// Get copy of children with styles applied, refs, count of visible columns, and the wrapper width
function getChildren(children, firstColSpan, colWidth, isMobile, availSpace, gapOffset, fullWidth, columnClasses) {
  const refs: RefObject<HTMLDivElement>[] = [];
  const childrenCopy: ReactNode[] = [];
  let visibleColumnCount = 0;
  let wrapperWidth = gapOffset; // Offset the gap from the first & last item
  [...children].forEach((child, idx) => {
    const colClasses = `shrink-0 whitespace-normal rounded-sm overflow-hidden sm:mx-4 ${columnClasses}`;
    let baseColWidth = colWidth;
    if (idx === 0) {
      const firstColSpanGapDifference = 4 * (firstColSpan - 1) * 2; // 4 represents 1rem (col gap)
      baseColWidth = colWidth * firstColSpan + firstColSpanGapDifference;
    }
    const thisColWidth = isMobile ? availSpace : (baseColWidth + 8) * 4; // 8 represents 2 rem (for gap between cols - 1 rem each side)
    const colStyles = !fullWidth ? { width: `${isMobile ? availSpace / 16 : baseColWidth / 4}rem` } : { width: '300px' };
    const childRef = createRef<HTMLDivElement>();
    refs.push(childRef);
    const potentialNewWrapperWidth = wrapperWidth + thisColWidth;
    if (potentialNewWrapperWidth <= availSpace) {
      wrapperWidth = potentialNewWrapperWidth;
      visibleColumnCount += idx === 0 ? 1 * firstColSpan : 1;
    }
    childrenCopy.push(
      <div key={uuidv4()} ref={childRef} className={colClasses} style={colStyles}>
        {child}
      </div>
    );
  });
  return {
    refs,
    childrenCopy,
    visibleColumnCount,
    wrapperWidth
  };
}
const handleSwipe = (start, end, scrollCarousel, setTouchPos, setMouseDownStart) => {
  const xSwipeDiff = end - start;
  if (xSwipeDiff <= -25) {
    scrollCarousel('right');
  }
  if (xSwipeDiff >= 25) {
    scrollCarousel('left');
  }
  setTouchPos({});
  setMouseDownStart(null);
};
const handleTouchEvent = (event, end, touchPos, setTouchPos) => {
  if (!end) {
    setTouchPos({
      ...touchPos,
      xStart: event.changedTouches[0].screenX
    });
  } else {
    setTouchPos({
      ...touchPos,
      xEnd: event.changedTouches[0].screenX
    });
  }
};

export default function OverflowCarousel({
  heading,
  id,
  children,
  cols = 6,
  firstColSpan = 1,
  wrapperClasses,
  headingWrapperClasses,
  columnClasses,
  omitDivider,
  displayActionIcons,
  fullWidth,
  defaultColWidth,
  appendage,
  omitMarginAuto,
  breakpoints
}: OverflowCarouselProps) {
  const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const breakpointMap = breakpoints || defaultBreakPoints;
  const [init, setInit] = useState(false);
  const [items, setItems] = useState<ReactNode>([]);
  const [activeItem, setActiveItem] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(0);
  const [adjustedCols, setAdjustedCols] = useState(cols);
  const [childRefs, setChildRefs] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(initialWidth);
  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleContainerWidth, setVisibleContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(initialWidth < mobileBreakpoint);
  const [gapOffset, setGapOffset] = useState(initialWidth < mobileBreakpoint ? 0 : 0 - 32); // 32 = 32px colgap (combined both sides)
  const [containerOffsetAmount, setContainerOffsetAmount] = useState(gapOffset); // Offset the gap from the first & last item
  const [rightDisabled, setRightDisabled] = useState(false);
  const [touchPos, setTouchPos] = useState({ xStart: 0, xEnd: 0 });
  const [mouseDownStart, setMouseDownStart] = useState(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const setHiddenItems = () => {
    const visibleCount = getPanelVisibleCount(windowWidth, visibleColumns, firstColSpan, activeItem, breakpointMap);
    // Set hidden/Visible items so hidden items can't be tabbed to by keyboard
    const lastActiveItem = activeItem + visibleCount - 1;
    childRefs.forEach((child, idx) => {
      const currChild = idx + 1;
      const { current } = child;
      if (current) {
        const { style } = current;
        if (currChild < activeItem || currChild > lastActiveItem) {
          // eslint-disable-next-line no-param-reassign
          style.visibility = 'hidden';
        } else {
          // eslint-disable-next-line no-param-reassign
          style.visibility = 'visible';
        }
      }
    });
  };
  const setActiveItemOffset = () => {
    if (childRefs && activeItem && childRefs[activeItem - 1]) {
      // Set offset amount for transition
      setContainerOffsetAmount(-1 * childRefs[activeItem - 1].current.offsetLeft);
    }
  };
  const transitionItems = () => {
    // Loop through refs, set all to visible (for transition animation)
    childRefs.forEach((child) => {
      if (child.current) {
        // eslint-disable-next-line no-param-reassign
        child.current.style.visibility = 'visible';
      }
    });
    setActiveItemOffset();
    // Set which children are not visible (to prevent keyboard tab focus on hidden items) - Delay to ensure transition animation has finished
    setTimeout(() => {
      setHiddenItems();
    }, 700);
  };
  const scrollCarousel = useCallback(
    (direction?: string) => {
      // We are just adjusting the scroll position (window size changed maybe)
      // Note: Offsets are negative values
      const numOfItems = children.length;
      let newActiveItem = activeItem;
      const visibleCount = getPanelVisibleCount(windowWidth, visibleColumns, firstColSpan, activeItem, breakpointMap);
      const offsetToAbsoluteRight = numOfItems - visibleCount + 1;
      setRightDisabled(false);
      if (direction) {
        if (direction === 'right') {
          const potentialNewActive = newActiveItem + visibleCount;
          if (potentialNewActive >= numOfItems || potentialNewActive > offsetToAbsoluteRight) {
            setRightDisabled(true);
            newActiveItem = offsetToAbsoluteRight;
          } else {
            newActiveItem = potentialNewActive;
          }
        } else {
          const potentialNewActive = newActiveItem - visibleCount;
          newActiveItem = potentialNewActive <= 0 ? 1 : potentialNewActive;
        }
      } else if (newActiveItem > numOfItems - visibleCount) {
        newActiveItem = offsetToAbsoluteRight;
      }
      if (newActiveItem !== activeItem) {
        setActiveItem(newActiveItem > 0 ? newActiveItem : 1);
      } else {
        // Not moving, just adjusting (browser resize)
        setActiveItemOffset();
        setHiddenItems();
      }
    },
    [activeItem, breakpointMap, children.length, firstColSpan, setActiveItemOffset, setHiddenItems, visibleColumns, windowWidth]
  );

  const getCarouselItems = useCallback(
    (forceRefresh: boolean) => {
      if (children && children.length) {
        // Default for 6 card grid 60 * 4 = 160px
        const currentBreakpoint = getCurrentBreakpoint(windowWidth, breakpointMap);
        // Actual number of visible columns after a resize at breakpoint, if any
        // Number of visible columns at the current breakpoint
        const visibleCols = isMobile ? 1 : getVisibleCols(currentBreakpoint, cols, breakpointMap);
        // Column width based on actual columns calculated from number of cols provided, with gap consumption included in width calc
        const colWidth = defaultColWidth || 60 * (6 / cols) + (6 / cols - 1) * 8;
        // 4 represents the visible gap accounted for between items

        const availSpace = isMobile ? containerRef.current?.clientWidth : (colWidth * visibleCols + (visibleCols - 1) * 8) * 4;
        if (availSpace) {
          setContainerWidth(availSpace);
        }

        const newFirstColSpan = currentBreakpoint ? 1 : firstColSpan; // If we've hit a breakpoint, 1st colspans drop down to 1
        const childrenData = getChildren(children, newFirstColSpan, colWidth, isMobile, availSpace, gapOffset, fullWidth, columnClasses);
        // Only set the children/refs if there's a change that should have them rerender (size change, visible column count change)
        if (forceRefresh || adjustedCols !== cols || childrenData.visibleColumnCount !== visibleColumns || childrenData.visibleColumnCount === 1) {
          setAdjustedCols(cols);
          setChildRefs(childrenData.refs);
          setItems(childrenData.childrenCopy);
          setVisibleColumns(childrenData.visibleColumnCount || 1);
        }
        setVisibleContainerWidth(childrenData.wrapperWidth);
      }
    },
    [adjustedCols, breakpointMap, children, cols, columnClasses, defaultColWidth, firstColSpan, fullWidth, gapOffset, isMobile, visibleColumns, windowWidth]
  );
  useEffect(() => {
    const isNowMobile = initialWidth <= mobileBreakpoint;
    setIsMobile(isNowMobile);
    setGapOffset(isNowMobile ? 0 : 0 - 32); // 32 = gap offset of 2rem
    setWindowWidth(initialWidth);
  }, [initialWidth]);
  // If children change, re-evaluate carousel items
  useEffect(() => {
    if (children && children.length) {
      getCarouselItems(true);
    }
  }, [children, getCarouselItems]);
  // After initialization, watch for window width changes as more/less items may have space to show
  useEffect(() => {
    if (init) {
      getCarouselItems(false);
    }
  }, [getCarouselItems, init, windowWidth]);
  // When visible children count changes, set scroll to adjust to different offsets
  useEffect(() => {
    if (init) {
      scrollCarousel();
    }
  }, [init, scrollCarousel, visibleColumns]);
  useEffect(() => {
    if (touchPos.xEnd) {
      handleSwipe(touchPos.xStart, touchPos.xEnd, scrollCarousel, setTouchPos, setMouseDownStart);
    }
  }, [touchPos.xEnd]);
  const handleMouseMoveEvent = (event) => {
    if (mouseDownStart && event.clientX) {
      handleSwipe(mouseDownStart, event.clientX, scrollCarousel, setTouchPos, setMouseDownStart);
    }
  };
  // After initialization, set items hidden so they can't be tabbed to
  useEffect(() => {
    if (init) {
      setHiddenItems();
      setActiveItemOffset();
    }
  }, [init]);
  // When the active item changes, or we switch to mobile breakpoint (scroll)
  useEffect(() => {
    if (init) {
      transitionItems();
    }
  }, [activeItem, init, isMobile, transitionItems]);
  useEffect(() => {
    if (!init && childRefs && childRefs[0] && childRefs[0].current) {
      setInit(true);
    }
  }, [childRefs, init]);
  const itemsWrapperStyles = { transform: `translateX(0%) translateX(${containerOffsetAmount / 16}rem)` };
  const swipeEvents = {
    onTouchStart: (e) => handleTouchEvent(e, false, touchPos, setTouchPos),
    onTouchEnd: (e) => handleTouchEvent(e, true, touchPos, setTouchPos),
    onMouseDown: (e) => setMouseDownStart(e.clientX),
    onMouseUp: (e) => handleMouseMoveEvent(e),
    onMouseLeave: () => setMouseDownStart(null)
  };
  const displayContainerWidth = !fullWidth ? { width: `${containerWidth / 16}rem` } : { width: '100%' };
  return (
    <div id={id} className={wrapperClasses || 'my-8'} ref={containerRef} {...swipeEvents}>
      <div className={omitMarginAuto ? '' : 'mx-auto'} style={displayContainerWidth}>
        <div className={headingWrapperClasses || 'flex items-center justify-between mb-6'}>
          <div className="w-full">{heading}</div>
          {appendage || null}
        </div>
        {!omitDivider && <Divider className="my-8" />}
        <ItemsContainer
          visibleContainerWidth={visibleContainerWidth}
          itemsWrapperStyles={itemsWrapperStyles}
          cardContainerRef={cardContainerRef}
          items={items}
          activeItem={activeItem}
          rightDisabled={rightDisabled}
          scrollCarousel={scrollCarousel}
          fullWidth={fullWidth}
          displayActionIcons={displayActionIcons}
        />
      </div>
    </div>
  );
}
