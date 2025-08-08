// components/ui/data-table.tsx
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TableSkeleton } from "./skeleton-table";

export interface ColumnDef<T> {
  accessorKey?: keyof T;
  header: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  emptySearchMessage?: string;
  hasSearch?: boolean;
  showIndex?: boolean;
  indexStartFrom?: number;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = "Tidak ada data",
  emptySearchMessage = "Tidak ada data yang ditemukan",
  hasSearch = false,
  showIndex = false,
  indexStartFrom = 1,
}: DataTableProps<T>) {
  if (loading && data.length === 0) {
    return (
      <TableSkeleton 
        columns={showIndex ? columns.length + 1 : columns.length} 
        rows={10}
      />
    );
  }

  return (
    <Card className="overflow-hidden border rounded-xl">
      <div className="relative">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              {showIndex && (
                <TableHead className="w-16 text-center">No</TableHead>
              )}
              {columns.map((column, index) => (
                <TableHead key={index} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  {showIndex && (
                    <TableCell className="text-center font-medium text-gray-500">
                      {indexStartFrom + index}
                    </TableCell>
                  )}
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={column.className}>
                      {column.cell 
                        ? column.cell(item)
                        : column.accessorKey 
                          ? String(item[column.accessorKey] || '-')
                          : '-'
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={showIndex ? columns.length + 1 : columns.length} 
                  className="text-center py-8 text-gray-500"
                >
                  {hasSearch ? emptySearchMessage : emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}