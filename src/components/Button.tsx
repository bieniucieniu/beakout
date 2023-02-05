export const Button = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button className={"text-center m-auto " + className} onClick={onClick}>
      {text}
    </button>
  );
};
