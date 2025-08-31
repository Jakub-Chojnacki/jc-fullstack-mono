import { Outlet } from "@tanstack/react-router";

function LayoutWithOutlet({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
}

export default LayoutWithOutlet;
