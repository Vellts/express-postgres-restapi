import { Request, NextFunction, Response } from "express";
import joi from "joi";

export const validateNewPost = (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        user_id: joi.string().required(),
        title: joi.string().required(),
        content: joi.string().required()
    })

    const { error } = schema.validate(req.body);

    if(error) return res.status(400).json({
        errors: {
            msg: error.details[0]?.message
        }
    });

    next();
};