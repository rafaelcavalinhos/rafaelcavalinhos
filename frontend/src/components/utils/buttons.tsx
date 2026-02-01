import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

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
