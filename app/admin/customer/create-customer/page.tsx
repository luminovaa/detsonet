"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { FormField } from "@/components/admin/form-field";
import { createCustomer } from "@/api/customer.api";
import { createCustomerSchema, CreateCustomerFormData } from "@/types/customer.types";
import { useErrorToast,  } from "@/components/admin/toast-reusable";

import { FileRejection } from "react-dropzone";
import AdminPanelLayout from "@/components/admin/admin-layout";
import { UploadDropzone } from "@/components/admin/dropzone-reusable";

// Tipe untuk jenis dokumen
const documentTypes = [
  { value: "KTP", label: "Kartu Tanda Penduduk (KTP)" },
  { value: "SIM", label: "Surat Izin Mengemudi (SIM)" },
  { value: "PASSPORT", label: "Paspor / Identitas Lain" },
];

// Tipe untuk jenis foto
const photoTypes = [
  { value: "house_front", label: "Foto Rumah dari Depan" },
  { value: "house_side", label: "Foto Rumah dari Samping" },
  { value: "customer_with_technician", label: "Foto Bersama Pelanggan" },
  { value: "equipment", label: "Foto Alat" },
];

export default function CreateCustomerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { showApiError, showValidationError } = useErrorToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showFormErrors, setShowFormErrors] = useState(false);

    const form = useForm({
      resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      nik: "",
      package_id: "",
      address: "",
      address_service: "",
      birth_date: undefined,
      birth_place: "",
      ip_address: "",
      lat: "",
      long: "",
      mac_address: "",
      notes: "",
      documents: [],
      photos: [],
    },
  });

  // State untuk menyimpan file yang diupload
  const [uploadedDocuments, setUploadedDocuments] = useState<{ file: File; type: string }[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<{ file: File; type: string }[]>([]);

  // Handler error untuk dropzone
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    rejectedFiles.forEach(({ file, errors }) => {
      errors.forEach((e) => {
        toast({
          variant: "destructive",
          title: "Upload Gagal",
          description: `${file.name}: ${e.message}`,
        });
      });
    });
  };

  // Submit form
  const onSubmit = async (data: CreateCustomerFormData) => {
    const formData = new FormData();

    // Append semua field biasa
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    // Append dokumen
    uploadedDocuments.forEach((doc, index) => {
      formData.append("documents", doc.file);
    });

    // Append foto
    uploadedPhotos.forEach((photo, index) => {
      formData.append("photos", photo.file);
    });

    try {
      setIsLoading(true);
      await createCustomer(formData);

      toast({
        title: "Berhasil!",
        description: "Pelanggan berhasil dibuat dan laporan dikirim via WhatsApp.",
      });

      setTimeout(() => {
        router.push("/admin/customer");
      }, 1500);
    } catch (err: any) {
      showApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormError = () => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      showValidationError(errors, "Form Tidak Valid");
      setShowFormErrors(true);
    }
  };

  return (
    <AdminPanelLayout title="Tambah Pelanggan Baru" showSearch={false}>
      <div className="max-w-4xl mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Formulir Pendaftaran Pelanggan</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, handleFormError)} className="space-y-8">
                {/* Informasi Dasar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    form={form}
                    name="name"
                    label="Nama Lengkap *"
                    placeholder="Masukkan nama lengkap"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="phone"
                    label="Nomor Telepon *"
                    placeholder="Contoh: 081234567890"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="email"
                    label="Email"
                    placeholder="Masukkan email (opsional)"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="nik"
                    label="NIK (Nomor Induk Kependudukan) *"
                    placeholder="Masukkan 16 digit NIK"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="birth_place"
                    label="Tempat Lahir"
                    placeholder="Contoh: Jakarta"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="birth_date"
                    label="Tanggal Lahir"
                    type="date"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="package_id"
                    label="Paket Internet *"
                    placeholder="Pilih paket"
                    type="select"
                    selectOptions={[
                      { value: "pkg-1", label: "Detso 10 Mbps" },
                      { value: "pkg-2", label "Detso 20 Mbps" },
                      { value: "pkg-3", label: "Detso 50 Mbps" },
                    ]}
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="mac_address"
                    label="MAC Address"
                    placeholder="Contoh: A1B2C3D4E5F6"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="ip_address"
                    label="IP Address"
                    placeholder="Contoh: 192.168.1.1"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="lat"
                    label="Latitude"
                    placeholder="Contoh: -6.200000"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="long"
                    label="Longitude"
                    placeholder="Contoh: 106.816666"
                    disabled={isLoading}
                  />
                </div>

                {/* Alamat */}
                <div className="space-y-4">
                  <FormField
                    form={form}
                    name="address"
                    label="Alamat Domisili *"
                    placeholder="Masukkan alamat lengkap tempat tinggal"
                    type="textarea"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="address_service"
                    label="Alamat Pemasangan *"
                    placeholder="Masukkan alamat pemasangan layanan"
                    type="textarea"
                    disabled={isLoading}
                  />
                  <FormField
                    form={form}
                    name="notes"
                    label="Catatan Tambahan"
                    placeholder="Catatan untuk teknisi (opsional)"
                    type="textarea"
                    disabled={isLoading}
                  />
                </div>

                {/* Upload Dokumen Identitas */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-medium">Unggah Dokumen Identitas</h3>
                  <p className="text-sm text-muted-foreground">
                    Unggah dokumen identitas seperti KTP, SIM, atau lainnya.
                  </p>

                  {documentTypes.map((docType) => (
                    <div key={docType.value} className="space-y-2">
                      <label className="text-sm font-medium">{docType.label}</label>
                      <UploadDropzone
                        onDrop={(acceptedFiles) => {
                          const file = acceptedFiles[0];
                          if (file) {
                            setUploadedDocuments((prev) =>
                              prev.filter((d) => d.type !== docType.value).concat({
                                file,
                                type: docType.value,
                              })
                            );
                            form.setValue("documents", [
                              ...form.getValues("documents").filter((d) => d.type !== docType.value),
                              { type: docType.value },
                            ]);
                          }
                        }}
                        onDropRejected={onDropRejected}
                        accept={{ "image/*": [], "application/pdf": [] }}
                        maxSize={5 * 1024 * 1024} // 5MB
                        label={`Unggah ${docType.label}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Upload Foto */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-medium">Unggah Foto Pendukung</h3>
                  <p className="text-sm text-muted-foreground">
                    Foto rumah, pelanggan, dan perangkat untuk dokumentasi instalasi.
                  </p>

                  {photoTypes.map((photoType) => (
                    <div key={photoType.value} className="space-y-2">
                      <label className="text-sm font-medium">{photoType.label}</label>
                      <UploadDropzone
                        onDrop={(acceptedFiles) => {
                          const file = acceptedFiles[0];
                          if (file) {
                            setUploadedPhotos((prev) =>
                              prev.filter((p) => p.type !== photoType.value).concat({
                                file,
                                type: photoType.value,
                              })
                            );
                            form.setValue("photos", [
                              ...form.getValues("photos").filter((p) => p.type !== photoType.value),
                              { type: photoType.value },
                            ]);
                          }
                        }}
                        onDropRejected={onDropRejected}
                        accept={{ "image/*": [] }}
                        maxSize={10 * 1024 * 1024} // 10MB
                        label={`Unggah ${photoType.label}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="rounded-3xl"
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isLoading} className="rounded-3xl">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Pelanggan"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminPanelLayout>
  );
}