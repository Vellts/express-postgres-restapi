import { Router } from "express";
import { create_post, delete_post, get_post, get_posts, update_post } from "../controllers/post.controller";


const route = Router();

route.get("/api/v1/posts/:id", get_post)
route.get("/api/v1/posts", get_posts)
route.post("/api/v1/posts", create_post)
route.delete("/api/v1/posts/:id", delete_post)
route.patch("/api/v1/posts/:id", update_post)

export default route;