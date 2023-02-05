export const ScoreBlock = ({
  text,
  value,
  className,
}: {
  text: string;
  value: number;
  className?: string;
}) => {
  return (
    <div className={"text-center m-auto " + className}>
      {text}: {value}
    </div>
  );
};
