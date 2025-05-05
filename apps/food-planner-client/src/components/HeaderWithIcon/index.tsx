import type { THeaderWithIconProps } from "./types";

function HeaderWithIcon({ icon: Icon, title }: THeaderWithIconProps) {
  return (
    <div className="flex items-center h-12">
      <Icon className="h-6 w-6 mr-2" />
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
}

export default HeaderWithIcon;
