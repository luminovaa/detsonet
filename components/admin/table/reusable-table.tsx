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
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { TableSkeleton } from "./skeleton-table";

export interface ColumnDef<T> {
  accessorKey?: keyof T;
  header: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface ActionConfig<T> {
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
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
  actions?: ActionConfig<T>;
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
  actions,
}: DataTableProps<T>) {
  if (loading && data.length === 0) {
    return (
      <TableSkeleton 
        columns={showIndex ? columns.length + 1 : columns.length} 
        rows={10}
      />
    );
  }

  // Calculate total columns including index and actions
  const totalColumns = columns.length + (showIndex ? 1 : 0) + (actions ? 1 : 0);

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
              {actions && (
                <TableHead className="w-24 text-center">Aksi</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow 
                  key={index} 
                  className="hover:bg-gray-50 group transition-colors duration-200"
                >
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
                  {actions && (
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {actions.onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => actions.onEdit!(item)}
                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {actions.onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => actions.onDelete!(item)}
                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={totalColumns} 
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