import { ReactNode, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function FlexCol({ children, className = '', ...props }: Props) {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      {children}
    </div>
  );
}

export function FlexRow({ children, className = '', ...props }: Props) {
  return (
    <div className={`flex flex-row ${className}`} {...props}>
      {children}
    </div>
  );
}

export function FlexCenter({ children, className = '', ...props }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      {children}
    </div>
  );
}
