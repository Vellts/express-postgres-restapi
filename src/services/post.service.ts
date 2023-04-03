import { Model } from 'sequelize';
import { PostInterface } from '../interfaces/post.interface';
import { postModel } from '../models/post.model';

export const getPostService = async (id: number) => {
    // console.log(id)
    if(!id) return {
        msg: "POST_ID_NOT_FOUND",
        code: 404
    }

    const getPost = await postModel.findOne({
        where: {
            postId: id
        }
    })

    if(!getPost) return {
        msg: "POST_NOT_FOUND",
        code: 404
    }

    return getPost;
}

export const getPostsService = async (limit: number) => {
    const getPosts = await postModel.findAll({
        limit
    });

    if(!getPosts) return {
        msg: "POSTS_NOT_FOUND",
        code: 404
    }

    return getPosts;
}

export const createPostService = async (userId: string, title: string, content: string) => {
    const createPost = await postModel.create({
        userId,
        title,
        content
    });

    if(!createPost) return {
        msg: "POST_NOT_CREATED",
        code: 500
    }

    return createPost;
};

export const deletePostService = async (id: string) => {
    const getPost = await postModel.findByPk(id)

    if (!getPost) return {
        msg: "POST_NOT_FOUND",
        code: 404
    }

    const deletePost: any = await getPost.destroy()
    if(!deletePost) return {
        msg: "POST_COULD_NOT_BE_DELETED",
        code: 400
    }

    return getPost
}

export const updatePostService = async(id: string, data: PostInterface) => {
    const post = await postModel.findByPk(id)

    if(!post) return {
        msg: "POST_NOT_FOUND",
        code: 404
    }

    const keys = Object.keys(data)
    keys.forEach((key) => {
        //@ts-ignore
        post[key] = data[key]
    })

    await post.save();

    return post;
}