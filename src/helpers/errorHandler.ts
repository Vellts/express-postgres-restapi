import { Response } from "express";

export class handleError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
    }
}