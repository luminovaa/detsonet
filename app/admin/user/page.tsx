"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdminPanelLayout from "@/components/admin/admin-layout";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserTableProps {
  users: User[];
  perPage?: number;
}

const dummyUsers = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

function UserTable({ users = dummyUsers, perPage = 5 }: UserTableProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / perPage);

  const start = (page - 1) * perPage;
  const paginatedUsers = users.slice(start, start + perPage);

  return (
    <AdminPanelLayout>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Sebelumnya
          </Button>

          <span className="text-sm text-gray-600">
            Halaman {page} dari {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
    </AdminPanelLayout>
  );
}

export default UserTable;
