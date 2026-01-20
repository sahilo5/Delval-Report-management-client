import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { Button } from "./Button";

interface MiniWindowProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
    closeOnOutsideClick?: boolean;
}

export function MiniWindow({
    isOpen,
    onClose,
    title,
    children,
    className,
    closeOnOutsideClick = true,
}: MiniWindowProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (closeOnOutsideClick && e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
            <div
                className={clsx(
                    "relative w-full max-w-lg rounded-xl bg-surface shadow-2xl ring-1 ring-border animate-in zoom-in-95 duration-200",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border px-6 py-4">
                    <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="h-8 w-8 p-0 rounded-full hover:bg-slate-100"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4 text-text-muted" />
                    </Button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 text-text-primary">
                    {children}
                </div>
            </div>
        </div>
    );
}
