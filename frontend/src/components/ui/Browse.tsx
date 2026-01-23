import React, { useState, useMemo } from "react";
import clsx from "clsx";
import Badge from "./Badge";
import { Button } from "./Button"; // Assuming Button exists in same directory

export type Column<T> = {
    header: string;
    accessor: keyof T | string; // Allow string for nested paths if needed in future
    render?: (row: T) => React.ReactNode;
    sortable?: boolean;
    editable?: boolean;
    className?: string;
};

export type BrowseProps<T> = {
    columns: Column<T>[];
    data: T[];
    title?: string;
    subtitle?: string;
    footerContent?: React.ReactNode;
    headerActions?: React.ReactNode;
    rowActions?: (row: T) => React.ReactNode;
    enableSearch?: boolean;
    enablePagination?: boolean;
    itemsPerPage?: number;
    className?: string;
    onRowClick?: (row: T) => void;
};

function Browse<T extends Record<string, any>>({
    columns,
    data,
    title,
    subtitle,
    footerContent,
    headerActions,
    rowActions,
    enableSearch = true,
    enablePagination = true,
    itemsPerPage = 10,
    className,
    onRowClick,
}: BrowseProps<T>) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const maxVisiblePages = 5;
    const [sortBy, setSortBy] = useState<keyof T | string | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

    // 🔍 Filter + sort data
    const filteredData = useMemo(() => {
        let filtered = [...data];

        if (search.trim() && enableSearch) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter((row) =>
                columns.some((col) => {
                    // Helper to get nested value
                    const getValue = (obj: any, path: any) => {
                        if (typeof path !== "string") return obj[path];
                        return path.split(".").reduce((acc, part) => acc && acc[part], obj);
                    };

                    const value = getValue(row, col.accessor);

                    if (value == null) return false;

                    if (Array.isArray(value)) {
                        return value.some((v) => String(v).toLowerCase().includes(searchLower));
                    }

                    if (typeof value === 'object') {
                        // Try to search stringified JSON for objects to catch deeply nested text
                        // or just return false if we don't want to search objects
                        return JSON.stringify(value).toLowerCase().includes(searchLower);
                    }

                    return String(value).toLowerCase().includes(searchLower);
                })
            );
        }

        if (sortBy && sortOrder) {
            filtered.sort((a, b) => {
                // Simple property access for now
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const aVal = (a as any)[sortBy];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const bVal = (b as any)[sortBy];

                if (typeof aVal === "number" && typeof bVal === "number") {
                    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
                }

                const aString = String(aVal ?? "");
                const bString = String(bVal ?? "");

                return sortOrder === "asc"
                    ? aString.localeCompare(bString)
                    : bString.localeCompare(aString);
            });
        }

        return filtered;
    }, [search, data, sortBy, sortOrder, enableSearch]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        if (!enablePagination) return filteredData;
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredData, currentPage, enablePagination, itemsPerPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handleSort = (accessor: keyof T | string) => {
        if (sortBy !== accessor) {
            setSortBy(accessor);
            setSortOrder("asc");
        } else if (sortOrder === "asc") {
            setSortOrder("desc");
        } else {
            setSortBy(null);
            setSortOrder(null);
        }
    };

    const renderPageNumbers = () => {
        const pages: React.ReactNode[] = [];
        if (!enablePagination || totalPages <= 1) return pages;

        const left = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const right = Math.min(totalPages, left + maxVisiblePages - 1);

        if (left > 1) {
            pages.push(
                <Button key="1" size="sm" variant="ghost" onClick={() => handlePageChange(1)}>1</Button>
            );
            if (left > 2) pages.push(<span key="start-ellipsis" className="px-2">...</span>);
        }

        for (let i = left; i <= right; i++) {
            pages.push(
                <Button
                    key={i}
                    size="sm"
                    variant={i === currentPage ? "primary" : "ghost"}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? "" : "text-gray-600"}
                >
                    {i}
                </Button>
            );
        }

        if (right < totalPages) {
            if (right < totalPages - 1) pages.push(<span key="end-ellipsis" className="px-2">...</span>);
            pages.push(
                <Button key={totalPages} size="sm" variant="ghost" onClick={() => handlePageChange(totalPages)}>{totalPages}</Button>
            );
        }
        return pages;
    };

    const [editedValues, setEditedValues] = useState<Record<string, any>>({}); // Key: rowIndex, Value: object of changes

    // ... sort/filter logic ...

    const handleCellChange = (rowIndex: number, accessor: string, value: any) => {
        setEditedValues((prev) => ({
            ...prev,
            [rowIndex]: {
                ...prev[rowIndex],
                [accessor]: value,
            },
        }));
    };

    const getRowData = (row: T, rowIndex: number) => {
        return { ...row, ...(editedValues[rowIndex] || {}) };
    };

    const renderCell = (row: T, col: Column<T>, rowIndex: number) => {
        // If sorting/filtering changes order, rowIndex needs to be stable relative to the *data source* if we want edits to stick to the ID. 
        // For now, using index in paginatedData. 
        // NOTE: In a real app, use a unique ID for keys in 'editedValues'. 
        // Assuming 'row' might have an ID, but falling back to index for genericness.
        // A better approach for generic components without enforced ID is difficult. 
        // We will use the index within *paginatedData* for simplicity in this demo, 
        // BUT for the "Save" feature to work robustly, we'll merge on the fly.

        const currentVal = (editedValues[rowIndex] && editedValues[rowIndex][col.accessor as string]) ?? row[col.accessor as keyof T];

        if (col.editable) {
            return (
                <input
                    type="text"
                    className="w-full px-2 py-1 text-sm border border-border rounded bg-white/50 focus:outline-none focus:ring-1 focus:ring-accent"
                    value={String(currentVal ?? "")}
                    onChange={(e) => handleCellChange(rowIndex, col.accessor as string, e.target.value)}
                />
            );
        }

        if (col.render) return col.render(row);

        const value = row[col.accessor as keyof T]; // Use original for display logic if not editing (or merged if we wanted live updates in non-input cells)
        // ... rest of render logic ...
        const header = col.header.toLowerCase();

        // Auto-badge logic for 'role' or 'status' if no custom render provided
        if (header.includes("role")) {
            if (Array.isArray(value)) {
                return (
                    <div className="flex flex-wrap gap-1">
                        {value.map((role: string, index: number) => (
                            <Badge key={index} text={role} variant="info" />
                        ))}
                    </div>
                );
            }
            return <Badge text={String(value)} variant="info" />;
        }

        if (header.includes("status")) {
            const status = String(value).toLowerCase();
            let variant: "success" | "danger" | "warning" | "info" | "neutral" = "neutral";
            if (status === "pending" || status === "under_testing") variant = "warning";
            if (status === "rejected") variant = "danger";
            if (["paid", "done", "approved", "repayed", "active"].includes(status)) variant = "success";
            return <Badge text={String(value)} variant={variant} />;
        }

        return String(value ?? "");
    };

    return (
        <div className={clsx("w-full h-auto p-4 overflow-hidden bg-surface/40 backdrop-blur-md rounded-xl border border-white/60 shadow-lg shadow-black/5", className)}>
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                <div>
                    {title && <h2 className="pl-1 text-2xl font-bold text-text-primary tracking-tight">{title}</h2>}
                    {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
                </div>

                <div className="flex items-center gap-3 flex-wrap justify-end">
                    {headerActions}

                    {enableSearch && (
                        <div className="relative w-64 group">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted group-focus-within:text-accent transition-colors">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm placeholder-text-muted font-medium text-text-primary"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-lg border border-border/50">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-accent/5 backdrop-blur-sm text-text-primary border-b border-accent/10">
                        <tr>
                            {columns.map((col) => {
                                const isSorted = sortBy === col.accessor;
                                const icon = isSorted
                                    ? sortOrder === "asc"
                                        ? " ↑"
                                        : sortOrder === "desc"
                                            ? " ↓"
                                            : ""
                                    : "";

                                return (
                                    <th
                                        key={col.accessor.toString()}
                                        onClick={() => col.sortable !== false && handleSort(col.accessor)}
                                        className={clsx(
                                            "px-6 py-4 text-left font-semibold uppercase text-xs tracking-wider text-text-muted select-none",
                                            col.sortable !== false && "cursor-pointer hover:text-accent transition-colors",
                                            col.className
                                        )}
                                    >
                                        <div className="flex items-center gap-1">
                                            {col.header}
                                            <span className="text-accent">{icon}</span>
                                        </div>
                                    </th>
                                );
                            })}
                            {rowActions && <th className="px-6 py-4 text-center font-semibold uppercase text-xs tracking-wider text-text-muted">Actions</th>}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border/50">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((originalRow, rowIdx) => {
                                const row = getRowData(originalRow, rowIdx); // Merge edits for rendering actions/cells
                                return (
                                    <tr
                                        key={rowIdx} // Better to have a unique ID if possible, but index works for now
                                        onClick={() => onRowClick?.(row)}
                                        className={clsx(
                                            "transition-colors duration-200 hover:bg-white/60",
                                            rowIdx % 2 === 0 ? "bg-white/20" : "bg-transparent",
                                            onRowClick && "cursor-pointer"
                                        )}
                                    >
                                        {columns.map((col, colIdx) => (
                                            <td key={colIdx} className="px-6 py-4 text-text-primary whitespace-nowrap">
                                                {renderCell(originalRow, col, rowIdx)}
                                            </td>
                                        ))}

                                        {rowActions && (
                                            <td className="px-6 py-4 flex items-center justify-center gap-2">
                                                {rowActions(row)}
                                            </td>
                                        )}
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (rowActions ? 1 : 0)}
                                    className="text-center p-8 text-text-muted italic"
                                >
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <span className="text-2xl">🔍</span>
                                        <p>No data found.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {enablePagination && (
                <div className="flex justify-between items-center mt-6 text-sm text-text-muted">
                    <p>
                        Showing <span className="font-medium text-text-primary">{paginatedData.length}</span> of <span className="font-medium text-text-primary">{filteredData.length}</span> entries
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </Button>
                        {renderPageNumbers()}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}

            {/* Footer */}
            {footerContent && (
                <div className="mt-4 pt-4 border-t border-border/50 text-sm font-medium text-text-muted">
                    {footerContent}
                </div>
            )}
        </div>
    );
}

export default Browse;
