/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminPanelLayout from "@/components/admin/admin-layout";
import { getPackages } from "@/api/package.api";
import { Package } from "@/types/package.types";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Pagination,
  PaginationMeta,
} from "@/components/admin/table/reusable-pagination";
import { ColumnDef, DataTable } from "@/components/admin/table/reusable-table";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/format-currency";

interface PackagesResponse {
  packages: Package[];
  pagination: PaginationMeta;
}

function PackageTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const urlSearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(urlSearch);
  const debouncedSearch = useDebounce(searchInput, 500);
 
  const [packages, setPackages] = useState<Package[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  const columns: ColumnDef<Package>[] = [
    {
      header: "Nama Paket",
      accessorKey: "name",
    },
    {
      header: "Kecepatan",
      accessorKey: "speed",
    },
    {
      header: "Harga",
      cell: (packages) => formatCurrency(packages.price),
    },
  ];

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
    const query = search ? `?${search}` : "";
    router.push(`${window.location.pathname}${query}`);
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit,
          ...(urlSearch && { search: urlSearch }),
        };

        const response = await getPackages(params);
        const data: PackagesResponse = response.data.data;

        setPackages(data.packages);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [currentPage, limit, urlSearch]);

  useEffect(() => {
    setSearchInput(urlSearch);
  }, [urlSearch]);

  const handleEditPackage = async (pkg: Package) => {
    console.log("Edit package:", pkg);
  };
  const handleDeletePackage = async (pkg: Package) => {
    console.log("Delete package:", pkg);
  };
  useEffect(() => {
    if (debouncedSearch !== urlSearch) {
      updateSearchParams({
        page: 1,
        limit,
        search: debouncedSearch,
      });
    }
  }, [debouncedSearch, urlSearch, limit]);

  const handlePageChange = (page: number) => {
    updateSearchParams({
      page,
      limit,
      ...(urlSearch && { search: urlSearch }),
    });
  };

  if (loading && !packages.length) {
    return (
      <AdminPanelLayout
        title="Daftar Paket"
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        searchPlaceholder="Cari paket..."
      >
        <DataTable
          columns={columns}
          data={[]}
          loading={true}
          showIndex={true}
          indexStartFrom={(currentPage - 1) * limit + 1}
        />
      </AdminPanelLayout>
    );
  }

  return (
    <AdminPanelLayout
      title="Daftar Paket"
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      searchPlaceholder="Cari paket..."
    >
      <div className="space-y-4">
        <div className="flex justify-end gap-3">
          
          <Button
            className="rounded-3xl"
            onClick={() => router.push("/admin/package/create-package")}
          >
            Tambah Paket
          </Button>
        </div>
        <DataTable
          columns={columns}
          data={packages}
          loading={loading}
          emptyMessage="Tidak ada data"
          emptySearchMessage="Tidak ada data yang ditemukan"
          hasSearch={!!urlSearch}
          showIndex={true}
          indexStartFrom={(currentPage - 1) * limit + 1}
          actions={{
            onDelete: handleDeletePackage,
            onEdit: handleEditPackage,
          }}
        />

        {pagination && (
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            showDataCount={true}
            dataCountText={{
              showing: "Menampilkan",
              of: "dari",
              data: "data",
            }}
          />
        )}
      </div>
    </AdminPanelLayout>
  );
}

export default PackageTable;
