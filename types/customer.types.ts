import { Package } from "./package.types";

export type Customer = {
    id?: string;
    name: string;
    phone: string;
    email?: string;
    nik?: string;
    birth_date?: Date;
    birth_place?: string;
    created_at?: Date;
    updated_at?: Date;
    documents?: Customer_Document[]
}

export type Customer_Document = {
    id?: string;
    customer_id: string;
    document_type: string;
    document_url: string;
    uploaded_at?: Date;
    customer?: Customer;
}

export type Service_Connection = {
    id?: string;
    customer_id: string;
    id_pel: string;
    package_id: string;
    package_name: string;
    package_speed: string;
    package_price: string;
    ip_address?: string;
    lat?: string;
    long?: string;
    mac_address?: string;
    status?: status;
    notes?: string;
    created_at?: Date;
    updated_at?: Date;

    customer?: Customer;
    package?: Package;

    pdf?: Customer_PDF[]
    photos?: Customer_Photo[]
}


export type Customer_Photo = {
    id?: string;
    service_id: string;
    photo_type: string;
    photo_url: string;
    uploaded_at?: Date;
    notes?: string;

    service?: Service_Connection
}

export type Customer_PDF = {
    id?: string;
    customer_id: string;
    service_connection_id: string;
    pdf_type: string;
    pdf_path: string;
    generated_at?: Date;

    customer?: Customer;
    service_connection?: Service_Connection;
}

enum status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}