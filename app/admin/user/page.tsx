"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminPanelLayout from "@/components/admin/admin-layout";
import { getUsers } from "@/api/user";
import { User } from "@/types/user.types";
import { useDebounce } from "@/hooks/use-debounce";
import { Pagination, PaginationMeta } from "@/components/admin/table/reusable-pagination";
import { ColumnDef, DataTable } from "@/components/admin/table/reusable-table";
import { RoleBadge } from "@/components/admin/role-badge";

interface UsersResponse {
  users: User[];
  pagination: PaginationMeta;
}

function UserTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');

  const limit = parseInt(searchParams.get('limit') || '10');
  const urlSearch = searchParams.get('search') || '';
  
  const [searchInput, setSearchInput] = useState(urlSearch);
  const debouncedSearch = useDebounce(searchInput, 500);
  
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  const columns: ColumnDef<User>[] = [
    {
      header: 'Nama',
      cell: (user) => user.profile?.full_name || '-'
    },
    {
      accessorKey: 'username',
      header: 'Username'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      header: 'Role',
      cell: (user) => <RoleBadge role={user.role} />
    }
  ];

  // Update URL parameters
  const updateSearchParams = (newParams: Record<string, string | number>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        current.set(key, value.toString());
      } else {
        current.delete(key);
      }
    });
    
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${window.location.pathname}${query}`);
  };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit,
          ...(urlSearch && { search: urlSearch }),
        };
        
        const response = await getUsers(params);
        const data: UsersResponse = response.data.data;
        
        setUsers(data.users);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, limit, urlSearch]);

  // Sync search input with URL parameter on mount
  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  // Update URL when debounced search changes
  useEffect(() => {
    if (debouncedSearch !== urlSearch) {
      updateSearchParams({
        page: 1,
        limit,
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch, urlSearch, limit]);

  // Handle page change
  const handlePageChange = (page: number) => {
    updateSearchParams({
      page,
      limit,
      ...(urlSearch && { search: urlSearch }),
    });
  };

  if (loading && !users.length) {
    return (
      <AdminPanelLayout 
        title="Daftar Pengguna"
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        searchPlaceholder="Cari pengguna..."
      >
        <DataTable
          columns={columns}
          data={[]}
          loading={true}
          showIndex={true}
          indexStartFrom={((currentPage - 1) * limit) + 1}
        />
      </AdminPanelLayout>
    );
  }

  return (
    <AdminPanelLayout 
      title="Daftar Pengguna"
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      searchPlaceholder="Cari pengguna..."
    >
      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          emptyMessage="Tidak ada data"
          emptySearchMessage="Tidak ada data yang ditemukan"
          hasSearch={!!urlSearch}
          showIndex={true}
          indexStartFrom={((currentPage - 1) * limit) + 1}
        />

        {pagination && (
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            showDataCount={true}
            dataCountText={{
              showing: "Menampilkan",
              of: "dari",
              data: "data"
            }}
          />
        )}
      </div>
    </AdminPanelLayout>
  );
}

export default UserTable;