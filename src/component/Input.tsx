import React, { FC } from "react";

interface InputProps {
  id: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input: FC<InputProps> = ({
  id,
  placeholder,
  type,
  value,
  onChange,
}) => {

  return (
    <section className="w-full flex space-x-3">
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full h-8 bg-transparent py-0 my-0 rounded-md px-3 focus:outline-none hover:border-none ${id === "description" ? 'text-[15px] font-light' : 'text-[20px]'}`}
      />
    </section>
  );
};

export default Input;
