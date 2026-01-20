import clsx from "clsx";
import { Loader2 } from "lucide-react";

type LoaderSize = "sm" | "md" | "lg" | "xl";

interface LoaderProps {
    size?: LoaderSize;
    className?: string;
    fullScreen?: boolean;
}

const sizeClasses: Record<LoaderSize, string> = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
};

export function Loader({
    size = "md",
    className,
    fullScreen = false,
}: LoaderProps) {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <Loader2
                    className={clsx(
                        "animate-spin text-primary",
                        sizeClasses[size],
                        className
                    )}
                />
            </div>
        );
    }

    return (
        <Loader2
            className={clsx(
                "animate-spin text-primary",
                sizeClasses[size],
                className
            )}
        />
    );
}
