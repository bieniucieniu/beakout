export const Navbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav className={"bg-cyan-300 grid grid-cols-2 h-12 " + className}>
      {children}
    </nav>
  );
};
