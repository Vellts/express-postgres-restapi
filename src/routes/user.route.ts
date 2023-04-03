import { Router } from "express";
import { delete_user, get_user, get_users, new_user, update_avatar, update_user } from "../controllers/user.controller";
import upload from "../middleware/multer";
import { validateRegisterUser, validateUpdateUser } from "../middleware/user.middleware";

const router = Router();

/**
    -- GET /api/v1/users | get all users
    -- GET /api/v1/users/:id | get user by id
    -- POST /api/v1/users | create user
    -- PUT /api/v1/users/:id | update user by id
    -- DELETE /api/v1/users/:id | delete user by id
    -- PATCH /api/v1/users/avatar | change avatar
 */

const root = '/api/v1';
// console.log(upload)

router.get(`${root}/users`, get_users);
router.get(`${root}/users/:id`, get_user);
router.post(`${root}/users`, validateRegisterUser, new_user);
router.patch(`${root}/users/:id`, validateUpdateUser, update_user);
router.delete(`${root}/users/:id`, delete_user);
router.patch(`${root}/users/avatar/:id`, upload.single('file'), update_avatar);

export default router;