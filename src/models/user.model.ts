// create a schema for the user with sequelize

import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db';
import bcrypt from 'bcryptjs';
// import { User } from '../interfaces/user.interface' 

export const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[a-z0-9\_\-]+$/i,
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "no adress",
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "no phone",
    },
    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    avatar: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
            public_id: "v1677547297",
            url: "https://res.cloudinary.com/djre2bseo/image/upload/v1677547297/cld-sample.jpg",
        }
    },
});

UserModel.beforeSave(async (user: any) => {

    if(!user.changed('password')) return;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});