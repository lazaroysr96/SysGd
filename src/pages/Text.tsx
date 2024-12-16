import { FC } from "react";

export enum Variant {
  Heading,
  Span,
}

export type TextProps = {
  label: string;
  variant: Variant;
  className?: string;
};

const Text: FC<TextProps> = ({ label, variant, className }) => {
  switch (variant) {
    // TODO: install twMerge
    case Variant.Heading:
      return (
        <h1 className={"text-lg font-semibold " + (className ?? "")}>
          {label}
        </h1>
      );
    case Variant.Span:
      return <div className="text-sm">{label}</div>;
  }
};

export default Text;
