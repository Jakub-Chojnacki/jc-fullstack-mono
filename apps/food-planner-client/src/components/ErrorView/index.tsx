import { Button, Card, CardContent, CardHeader, CardTitle } from "@jcmono/ui";
import { AlertCircle } from "lucide-react";

function ErrorView() {
  return (
    <Card className="max-w-md mx-auto mt-24 shadow-lg">
      <CardHeader className="flex flex-col items-center">
        <AlertCircle className="mb-4 text-red-600" size={48} />
        <CardTitle className="text-red-600">Connection Error</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">
          We couldn't connect to the server.
          <br />
          Please check your internet connection and try again.
        </p>
        <Button variant="destructive" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </CardContent>
    </Card>
  );
}

export default ErrorView;
