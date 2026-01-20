import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Loader } from "./ui/Loader";
import { MiniWindow } from "./ui/MiniWindow";
import { Tabs, TabsList, TabTrigger, TabsContent } from "./ui/Tabs";
import { useToast } from "./ui/Toaster";
import { Checkbox } from "./ui/Checkbox";
import { Select } from "./ui/Select";
import { TextArea } from "./ui/TextArea";

export default function ComponentTest() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    return (
        <div className="min-h-screen bg-background p-8 space-y-12">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Component Playground</h1>
                    <p className="text-text-muted mt-2">Test area for all UI components.</p>
                </div>

                {/* Toaster Section */}
                <section className="space-y-4 p-6 bg-surface rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-semibold text-text-primary">Toaster</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button
                            variant="success"
                            onClick={() => toast({ type: "success", title: "Success", message: "Operation completed successfully!" })}
                        >
                            Success Toast
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => toast({ type: "error", title: "Error", message: "Something went wrong." })}
                        >
                            Error Toast
                        </Button>
                        <Button
                            variant="warning"
                            onClick={() => toast({ type: "warning", title: "Warning", message: "Please check your inputs." })}
                        >
                            Warning Toast
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-accent/10 text-accent hover:bg-accent/20"
                            onClick={() => toast({ type: "info", title: "Info", message: "Here is some useful information." })}
                        >
                            Info Toast
                        </Button>
                    </div>
                </section>

                {/* Modals Section */}
                <section className="space-y-4 p-6 bg-surface rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-semibold text-text-primary">MiniWindow (Modal)</h2>
                    <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

                    <MiniWindow
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Example Modal"
                    >
                        <div className="space-y-4">
                            <p>This is a modal window with a backdrop blur effect.</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button onClick={() => { toast({ type: "success", message: "Action confirmed!" }); setIsModalOpen(false); }}>Confirm</Button>
                            </div>
                        </div>
                    </MiniWindow>
                </section>

                {/* Tabs Section */}
                <section className="space-y-4 p-6 bg-surface rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-semibold text-text-primary">Tabs</h2>
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="mb-4">
                            <TabTrigger value="account">Account</TabTrigger>
                            <TabTrigger value="password">Password</TabTrigger>
                            <TabTrigger value="settings">Settings</TabTrigger>
                        </TabsList>
                        <TabsContent value="account" className="p-4 bg-background rounded-lg border border-border">
                            <h3 className="font-medium mb-2">Account Tab</h3>
                            <p className="text-sm text-text-muted">Manage your account details here.</p>
                        </TabsContent>
                        <TabsContent value="password" className="p-4 bg-background rounded-lg border border-border">
                            <h3 className="font-medium mb-2">Password Tab</h3>
                            <p className="text-sm text-text-muted">Change your password here.</p>
                        </TabsContent>
                        <TabsContent value="settings" className="p-4 bg-background rounded-lg border border-border">
                            <h3 className="font-medium mb-2">Settings Tab</h3>
                            <p className="text-sm text-text-muted">Adjust your preferences here.</p>
                        </TabsContent>
                    </Tabs>
                </section>

                {/* Loaders Section */}
                <section className="space-y-4 p-6 bg-surface rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-semibold text-text-primary">Loaders</h2>
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-text-muted">Small</span>
                            <Loader size="sm" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-text-muted">Medium</span>
                            <Loader size="md" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-text-muted">Large</span>
                            <Loader size="lg" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-text-muted">Extra Large</span>
                            <Loader size="xl" />
                        </div>
                    </div>
                </section>

                {/* Form Inputs Section */}
                <section className="space-y-4 p-6 bg-surface rounded-xl shadow-sm border border-border">
                    <h2 className="text-xl font-semibold text-text-primary">Form Inputs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Standard Input" placeholder="Type something..." />
                        <Input label="Error State" error="This field is required" placeholder="Invalid input" />
                        <div className="space-y-2">
                            <Select label="Select Example">
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </Select>
                        </div>
                        <TextArea placeholder="Text area example..." />
                        <div className="flex items-center gap-2 pt-8">
                            <Checkbox id="check1" />
                            <label htmlFor="check1" className="text-sm text-text-primary">Checkbox Example</label>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
