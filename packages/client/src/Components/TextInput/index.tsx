import React from 'react';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput = React.forwardRef(
  (
    { id, type = 'text', children, ...props }: TextInputProps,
    ref?: React.LegacyRef<HTMLInputElement>
  ) => (
    <div className="group">
      <label htmlFor={`${id}-input`}>{children}</label>
      <input
        id={id}
        ref={ref}
        name={`${id}-input`}
        className="w-full bg-transparent leading-loose outline-none"
        type={type}
        {...props}
      />
      <div className="w-full border-t-2 border-gray-300 group-hover:border-gray-900"></div>
    </div>
  )
);

export default TextInput;
