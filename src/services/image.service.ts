import cloudinary from "../helpers/cloudinary";
import { unlink } from "fs";
import { promisify } from "util";
import { UserModel } from "../models/user.model";
// import { errorHandler } from "../helpers/errorHandler";
import { Response } from "express";
import { User } from "../interfaces/user.interface";
import { Model } from "sequelize";
import { postModel } from "../models/post.model";
import { PostInterface } from "../interfaces/post.interface";

const asyncUnlink = promisify(unlink);

export const updateAvatarService = async(id: string, avatar: string) => {
    const findUser: User | Model | any = await UserModel.findByPk(id);

    if(!findUser) return {
        msg: "USER_NOT_FOUND",
        code: 404
    };

    const uploadImage = await cloudinary.uploader.upload(avatar, {
        folder: "test",
    });

    if(!uploadImage) return {
        msg: "IMAGE_NOT_UPLOADED",
        code: 400
    };
    
    findUser.avatar = {
        public_id: uploadImage.public_id,
        url: uploadImage.secure_url
    };

    // delete image from path
    asyncUnlink(avatar);
    

    await findUser.save();

    return findUser;
}

export const updatePostImageService = async (id: string, image: string) => {
    const post: Model | PostInterface | any = await postModel.findByPk(id)

    if (!post) return {
        msg: 
        "POST_NOT_FOUND",
        code: 404
    }

    const uploadImage = await cloudinary.uploader.upload(image, {
        folder: 'test'
    })

    if (!uploadImage) return {
        msg: "IMAGE_COULD_NOT_BE_UPLOADED",
        code: 400
    }

    post.image = {
        public_id: uploadImage.public_id,
        url: uploadImage.secure_url
    }
    asyncUnlink(image);

    await post.save();

    return post;
}