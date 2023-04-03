import { sequelize } from "../database/db";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model";

export const commentsModel = sequelize.define("comments", {
    comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
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
});

UserModel.hasMany(commentsModel, {
    foreignKey: "userId",
    sourceKey: "id",
});

commentsModel.belongsTo(UserModel, {
    foreignKey: "userId",
    targetKey: "id",
});