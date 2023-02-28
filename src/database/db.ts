import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://postgres:123123@localhost:5432/curso_sql')

export const sequelize_validate = async () => {
    try {
        await sequelize.authenticate();
        console.log(`Connection to database successful!`);
    } catch (error) {
        console.log('Somenthing went wrong with the connection to the database');
    }
}