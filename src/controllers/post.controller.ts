import { Request, Response } from "express";
import { Model } from "sequelize";
import { asyncHandler } from "../helpers/asyncHandler";
import { ErrorHandler } from "../interfaces/error.interface";
import { createPostService, deletePostService, getPostService, getPostsService, updatePostService } from "../services/post.service";

export const get_post = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    // console.log(id)
    const data: Model | ErrorHandler = await getPostService(Number(id));

    if(data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "POST_FOUND",
            data
        })
    }

    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })

});

export const get_posts = asyncHandler(async (req: Request, res: Response) => {
    const { limit } = req.query

    const data: Model[] | ErrorHandler | boolean = await getPostsService(Number(limit));

    if(data instanceof Array) {
        return res.status(200).json({
            errors: null,
            msg: "POSTS_FOUND",
            data
        })
    }

    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })
});

export const create_post = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, title, content } = req.body;

    const data: Model | ErrorHandler = await createPostService(user_id, title, content);

    if(data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "POST_CREATED",
            data
        });
    }

    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })
});

export const delete_post = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const data: Model | ErrorHandler = await deletePostService(id)

    if (data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "POST_DELETED",
            data
        })
    }

    return res.status(data.code).json({
        errors: {
            msg: data.msg
        }
    })
})

export const update_post = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params

    const data: Model | ErrorHandler = await updatePostService(id, req.body)

    if (data instanceof Model) {
        return res.status(200).json({
            errors: null,
            msg: "POST_UPDATED",
            data
        })
    }

    return res.status(data.code).json({
        errors: data.msg
    })
})