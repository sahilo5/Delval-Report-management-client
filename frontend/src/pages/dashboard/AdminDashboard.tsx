export function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">Active Sessions</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500">System Status</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">Healthy</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] flex items-center justify-center text-gray-400">
                System Overview Chart Placeholder
            </div>
        </div>
    );
}
