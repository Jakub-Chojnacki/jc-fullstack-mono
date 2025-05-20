import type { THeaderWithIconProps } from "./types";

function HeaderWithIcon({ icon: Icon, title }: THeaderWithIconProps) {
  return (
    <div className="flex items-center h-12 ">
      <Icon className="h-6 w-6 mr-2 text-violet-500" />
      <h2 className="bg-gradient-to-r from-violet-500 to-violet-700 bg-clip-text text-transparent text-3xl font-bold">{title}</h2>
    </div>
  );
}

export default HeaderWithIcon;
