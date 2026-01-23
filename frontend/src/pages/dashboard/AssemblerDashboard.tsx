import { Button } from '../../components/ui/Button';

export function AssemblerDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Assembler Tasks</h1>
                <Button variant="primary">New Assembly Record</Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Current Assignments</h3>
                </div>
                <div className="p-6">
                    <p className="text-gray-500 text-center py-8">Select a task to begin.</p>
                </div>
            </div>
        </div>
    );
}
