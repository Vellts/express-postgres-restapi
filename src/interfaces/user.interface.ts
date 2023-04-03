export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    adress?: string;
    phone?: string;
    role: string;
    status: string;
    avatar?: {
        public_id: string;
        url: string;
    };
}

export interface validateUser {
    username: string;
    email: string;
    password: string;
    phone?: string;
    adress?: string;
}