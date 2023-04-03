import { sequelize } from "../database/db";
import { DataTypes } from "sequelize";
import { commentsModel } from "./comments.model";
import { UserModel } from "./user.model";

export const postModel = sequelize.define("posts", {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
            public_id: "v1677547297",
            url: "https://res.cloudinary.com/djre2bseo/image/upload/v1677547297/cld-sample.jpg",
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    comment: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
    }
});

postModel.hasMany(commentsModel, {
    // foreignKey: "postId",
    // sourceKey: "comment_id",
});

// commentsModel.belongsTo(postModel, {
//     foreignKey: "postId",
//     targetKey: "comment_id",
// });

UserModel.hasMany(postModel, {
    // foreignKey: "userId",
    // sourceKey: "id",
});


