import { User } from "./user.types";

export type Profile = {
    id?: string;
    user_id: string;
    full_name: string;
    avatar: string;
    created_at?: Date;
    updated_at?: Date;
    user: User;
};