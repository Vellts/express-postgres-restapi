import { User } from "./user.interface"

export interface PostInterface {
    postId: number,
    content: string,
    image: {
        public_id: string,
        url: string
    },
    createdAt?: Date,
    updatedAt?: Date,
    userId: string,
    comment?: string[],
    likes?: User[]
}