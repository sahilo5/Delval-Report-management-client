import { Button } from '../../components/ui/Button';

export function TesterDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Quality Testing</h1>
                <Button variant="primary">New Test Report</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder cards for tests */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-gray-500">Test #{2024000 + i}</span>
                            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">In Progress</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Actuator Series X-{i}00</h3>
                        <p className="text-sm text-gray-500 mb-4">Started 2 hours ago</p>
                        <Button variant="outline" fullWidth size="sm">Continue Testing</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
