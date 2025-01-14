import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-lime-100 to-cyan-400 h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
