import { Profile } from "./profile.types";

export type User = {
    id?: string;
    username: string;
    email: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    role?: role;
    profile?: Profile;
}


enum role {
    TEKNISI = "TEKNISI",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}