
import { Button } from "../components/ui/Button";
import { ShieldAlert } from "lucide-react";

export function Unauthorized() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="bg-surface p-8 rounded-2xl shadow-xl border border-border max-w-md w-full text-center space-y-6">
                <div className="w-16 h-16 bg-danger/10 rounded-full flex items-center justify-center mx-auto text-danger">
                    <ShieldAlert className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-bold text-text-primary">
                    Access Denied
                </h1>

                <p className="text-text-muted">
                    You do not have permission to access this resource. Please contact your administrator if you believe this is a mistake.
                </p>

                <Button
                    variant="primary"
                    fullWidth
                    onClick={() => window.location.href = "/"}
                >
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
}
