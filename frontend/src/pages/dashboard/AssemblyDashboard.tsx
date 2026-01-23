export function AssemblyDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Assembly Management</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h3>
                    <div className="space-y-4">
                        <p className="text-sm text-gray-500">No pending items.</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Status</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Line A</span>
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Line B</span>
                            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Maintenance</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
