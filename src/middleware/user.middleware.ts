import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { validateUser } from "../interfaces/user.interface";

export const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {
    
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        phone: Joi.string().min(6).max(255).optional().regex(/^[0-9]+$/).message("Phone must be a number"),
        adress: Joi.string().min(6).max(255).optional(),
    })

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).json({
        errors: {
            msg: error.details[0]?.message
        }
    });

    next();
};

export const validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).optional().allow(null),
        password: Joi.string().min(6).max(255).optional().allow(null),
        email: Joi.string().min(6).max(255).optional().allow(null).email(),
        phone: Joi.string().min(6).max(255).optional().allow(null).regex(/^[0-9]+$/).message("Phone must be a number"),
        adress: Joi.string().min(6).max(255).optional().allow(null),
    })

    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({
            errors: {
                msg: "Body is empty"
            }
        });
    }

    const { error } = schema.validate(req.body);
    // console.log(error)

    if(error) return res.status(400).json({
        errors: {
            msg: error.details[0]?.message
        }
    });

    next();


};