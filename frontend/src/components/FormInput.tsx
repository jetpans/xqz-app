import { HTMLInputTypeAttribute } from "react";
import { cn } from "../utils/cn";

interface Props<T> {
  value: T;
  onChange: (newValue: T) => void;
  type: HTMLInputTypeAttribute;
  required: boolean;
  className?: string;
}

export default function FormInput<
  T extends string | number | readonly string[]
>(props: Props<T>) {
  return (
    <input
      {...props}
      onChange={e => props.onChange(e.target.value as T)}
      className={cn(
        "bg-gray-100 p-2 px-3 border-gray-200 shadow-inner border-2 rounded-md text-text font-body",
        props.className
      )}
    />
  );
}
