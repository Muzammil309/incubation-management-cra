import React from 'react';

interface SoftBoxProps {
  children: React.ReactNode;
  component?: string;
  className?: string;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  display?: 'flex' | 'block' | 'inline' | 'inline-block' | 'none';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  textAlign?: 'left' | 'center' | 'right';
  width?: string | number;
  height?: string | number;
  minHeight?: string;
  borderRadius?: string;
  background?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  position?: 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  zIndex?: number;
  overflow?: 'hidden' | 'visible' | 'auto' | 'scroll';
  sx?: React.CSSProperties;
  role?: string;
  [key: string]: any;
}

const SoftBox: React.FC<SoftBoxProps> = ({
  children,
  component = 'div',
  className = '',
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  display,
  alignItems,
  justifyContent,
  textAlign,
  width,
  height,
  minHeight,
  borderRadius,
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  overflow,
  sx,
  ...props
}) => {
  const Component = component as any;

  // Convert spacing props to Tailwind classes
  const getSpacingClass = (prop: string, value?: number) => {
    if (value === undefined) return '';
    const spacingMap: { [key: number]: string } = {
      0: '0',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      8: '8',
      10: '10',
      12: '12',
      16: '16',
      20: '20',
      24: '24',
    };
    return `${prop}-${spacingMap[value] || value}`;
  };

  const classes = [
    className,
    // Padding
    p !== undefined && getSpacingClass('p', p),
    px !== undefined && getSpacingClass('px', px),
    py !== undefined && getSpacingClass('py', py),
    pt !== undefined && getSpacingClass('pt', pt),
    pb !== undefined && getSpacingClass('pb', pb),
    pl !== undefined && getSpacingClass('pl', pl),
    pr !== undefined && getSpacingClass('pr', pr),
    // Margin
    m !== undefined && getSpacingClass('m', m),
    mx !== undefined && getSpacingClass('mx', mx),
    my !== undefined && getSpacingClass('my', my),
    mt !== undefined && getSpacingClass('mt', mt),
    mb !== undefined && getSpacingClass('mb', mb),
    ml !== undefined && getSpacingClass('ml', ml),
    mr !== undefined && getSpacingClass('mr', mr),
    // Display
    display === 'flex' && 'flex',
    display === 'block' && 'block',
    display === 'inline' && 'inline',
    display === 'inline-block' && 'inline-block',
    display === 'none' && 'hidden',
    // Flex alignment
    alignItems === 'center' && 'items-center',
    alignItems === 'flex-start' && 'items-start',
    alignItems === 'flex-end' && 'items-end',
    alignItems === 'stretch' && 'items-stretch',
    alignItems === 'baseline' && 'items-baseline',
    justifyContent === 'center' && 'justify-center',
    justifyContent === 'flex-start' && 'justify-start',
    justifyContent === 'flex-end' && 'justify-end',
    justifyContent === 'space-between' && 'justify-between',
    justifyContent === 'space-around' && 'justify-around',
    justifyContent === 'space-evenly' && 'justify-evenly',
    // Text alignment
    textAlign === 'center' && 'text-center',
    textAlign === 'left' && 'text-left',
    textAlign === 'right' && 'text-right',
    // Position
    position === 'relative' && 'relative',
    position === 'absolute' && 'absolute',
    position === 'fixed' && 'fixed',
    position === 'sticky' && 'sticky',
    // Overflow
    overflow === 'hidden' && 'overflow-hidden',
    overflow === 'visible' && 'overflow-visible',
    overflow === 'auto' && 'overflow-auto',
    overflow === 'scroll' && 'overflow-scroll',
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {
    ...sx,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
    ...(minHeight && { minHeight }),
    ...(borderRadius && { borderRadius }),
    ...(background && { background }),
    ...(backgroundImage && { backgroundImage }),
    ...(backgroundSize && { backgroundSize }),
    ...(backgroundPosition && { backgroundPosition }),
    ...(backgroundRepeat && { backgroundRepeat }),
    ...(top !== undefined && { top: typeof top === 'number' ? `${top}px` : top }),
    ...(right !== undefined && { right: typeof right === 'number' ? `${right}px` : right }),
    ...(bottom !== undefined && { bottom: typeof bottom === 'number' ? `${bottom}px` : bottom }),
    ...(left !== undefined && { left: typeof left === 'number' ? `${left}px` : left }),
    ...(zIndex !== undefined && { zIndex }),
  };

  return (
    <Component className={classes} style={style} {...props}>
      {children}
    </Component>
  );
};

export default SoftBox;
