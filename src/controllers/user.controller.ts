import { NextFunction, Request, Response } from "express";
import { Model } from "sequelize";
import { asyncHandler } from "../helpers/asyncHandler";
import { handleError } from "../helpers/errorHandler";
import { ErrorHandler } from "../interfaces/error.interface";
import { updateAvatarService } from "../services/image.service";
import { addUserService, deleteUserService, getUserService, getUsersService, updateUserService } from "../services/user.service";

export const get_users = asyncHandler(async (req: Request, res: Response) => {
    const data: Model[] | ErrorHandler = await getUsersService();

    if(data instanceof Array) {
        return res.status(200).json({
            errors: null,
            msg: "USERS_FOUND",
            data
        });
    }
    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })
});

export const get_user = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data: Model | ErrorHandler = await getUserService(id);

    if(data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "USER_FOUND",
            data
        });
    }

    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })
});

export const new_user = asyncHandler(async (req: Request, res: Response) => {
    const data: Model | ErrorHandler = await addUserService(req.body);

    if(data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "USER_CREATED",
            data
        });
    }
    
    return res.status(400).json({
        errors: {
            msg: data.msg
        }
    });
})

export const update_user = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // update user with types

    const data: ErrorHandler | Model = await updateUserService(id, req.body);

    if(data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "USER_UPDATED",
            data
        });
    }
    
    // console.log(data)
    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })
});

export const delete_user = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const data: ErrorHandler | Model = await deleteUserService(id);

    if(data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "USER_DELETED",
            data
        });
    }

    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })
});

export const update_avatar = asyncHandler(async (req: any, res: Response) => {
    const { id } = req.params;
    const { path } = req.file;
    // console.log(req.file)

    const data: Model | ErrorHandler = await updateAvatarService(id, path);

    if(data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "AVATAR_UPDATED",
            data
        });
    }

    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    });
});