import { Customer } from "./customer.types";

export type Whatsapp_logs = {
    id?: string;
    customer_id: string;
    phone_number: string;
    message_type: string;
    status: string;
    error_message?: string;
    sent_at?: Date;
    created_at?: Date;
    updated_at?: Date;

    customer?: Customer;
}