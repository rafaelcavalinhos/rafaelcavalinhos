import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function TextAnchor({ children, className, ...props }: AnchorProps) {
  return (
    <a className={`group ${className ?? ''}`} {...props}>
      <span className="inline-block cursor-pointer transition-transform duration-100 group-hover:scale-115">
        {children}
      </span>
    </a>
  );
}

export function TextButton({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`group ${className ?? ''}`} {...props}>
      <span className="inline-block cursor-pointer transition-transform duration-100 group-hover:scale-115">
        {children}
      </span>
    </button>
  );
}
