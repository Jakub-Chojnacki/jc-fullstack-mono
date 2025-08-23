import type { THeaderWithIconProps } from "./types";

function HeaderWithIcon({ icon: Icon, title }: THeaderWithIconProps) {
  return (
    <div className="flex items-center gap-2 w-fit px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium text-primary">{title}</span>
    </div>
  );
}

export default HeaderWithIcon;
