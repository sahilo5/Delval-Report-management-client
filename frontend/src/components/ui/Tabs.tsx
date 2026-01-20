import React from "react";
import clsx from "clsx";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

const useTabs = () => {
    const context = React.useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs compound components must be used within a <Tabs> component");
    }
    return context;
};

/* -------------------------------------------------------------------------------------------------
 * Root Component: Tabs
 * -----------------------------------------------------------------------------------------------*/

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
}

export function Tabs({
    defaultValue,
    value: controlledValue,
    onValueChange: onControlledValueChange,
    children,
    className,
    ...props
}: TabsProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);

    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
    const onValueChange = onControlledValueChange || setUncontrolledValue;

    return (
        <TabsContext.Provider value={{ value, onValueChange }}>
            <div className={clsx("w-full", className)} {...props}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

/* -------------------------------------------------------------------------------------------------
 * Component: TabsList
 * -----------------------------------------------------------------------------------------------*/

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={clsx(
                "inline-flex h-10 items-center justify-center rounded-lg bg-surface p-1 text-text-muted ring-1 ring-border",
                className
            )}
            {...props}
        />
    );
}

/* -------------------------------------------------------------------------------------------------
 * Component: TabTrigger
 * -----------------------------------------------------------------------------------------------*/

interface TabTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}

export function TabTrigger({ className, value, children, ...props }: TabTriggerProps) {
    const context = useTabs();
    const isActive = context.value === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => context.onValueChange(value)}
            className={clsx(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive
                    ? "bg-primary text-white shadow-sm"
                    : "hover:bg-background/50 hover:text-text-primary",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

/* -------------------------------------------------------------------------------------------------
 * Component: TabsContent
 * -----------------------------------------------------------------------------------------------*/

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}

export function TabsContent({ className, value, children, ...props }: TabsContentProps) {
    const context = useTabs();
    const isActive = context.value === value;

    if (!isActive) return null;

    return (
        <div
            role="tabpanel"
            className={clsx(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in duration-200 slider-in-from-bottom-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
