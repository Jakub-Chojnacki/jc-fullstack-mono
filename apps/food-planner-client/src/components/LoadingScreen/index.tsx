import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center h-full justify-center space-y-2 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <h2 className="text-2xl font-bold tracking-tight">Loading...</h2>
      <p className="text-sm text-muted-foreground">
        Please wait while we load the application.
      </p>
    </div>
  );
};

export default LoadingScreen;
