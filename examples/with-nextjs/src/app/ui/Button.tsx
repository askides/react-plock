import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, style, ...props }, ref) => {
    return <button className={className} ref={ref} {...props} />;
  }
);

Button.displayName = 'Button';

export { Button };
