import { User } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { randomUUID } from 'crypto'
import cloudinary from "../helpers/cloudinary";
import { Model } from "sequelize";
import { promisify } from 'util'
import { unlink } from 'fs'

const asyncUnlink = promisify(unlink);


export const getUsersService = async () => {
    const getUsers = await UserModel.findAll();

    if(!getUsers) return {
        msg: "USERS_NOT_FOUND",
        code: 404
    }

    return getUsers;
};

export const getUserService = async (id: string) => {
    const getUser = await UserModel.findOne({
        where: {
            id
        }
    })

    if(!getUser) return {
        msg: "USER_NOT_FOUND",
        code: 404
    }

    return getUser;
};

export const addUserService = async (user: User) => {
    const existUser = await UserModel.findOne({
        where: {
            email: user.email
        }
    });

    if (existUser) return {
        msg: "USER_ALREADY_EXIST",
        code: 400
    };

    const id = randomUUID();
    const roles = user.username === "admin" ? ["user", "admin"] : ["user"];
    // const pass = await generatePasswordHash(user.password);

    const newUser = await UserModel.create({
        id,
        roles,
        username: user.username,
        email: user.email,
        password: user.password,
    });

    return newUser;

};

export const updateUserService = async (id: string, user: User) => {
    const findUser = await UserModel.findByPk(id);

    if(!findUser) return {
        msg: "USER_NOT_FOUND",
        code: 404
    };

    const keys = Object.keys(user);
    keys.forEach((key) => {
        // @ts-ignore
        findUser[key] = user[key];
    });

    await findUser.save();
    

    return findUser;
};

export const deleteUserService = async (id: string) => {
    const findUser = await UserModel.findByPk(id);

    if(!findUser) return {
        msg: "USER_NOT_FOUND",
        code: 404
    };

    await findUser.destroy();

    console.log(findUser);

    return findUser;
};