export type TImageUploadProps = {
  value?: File;
  onChange: (file: File | undefined) => void;
  disabled?: boolean;
  className?: string;
};
