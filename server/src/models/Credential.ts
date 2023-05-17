import { DataTypes, INTEGER, STRING } from "sequelize";
import db from '../db/connection';

const Credential = db.define('Credentials', {
    idCredentials: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull : false,
    },
    login: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
            notNull: true,
            len: [5,45]
        }
    },
    hashPassword: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    type: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1,1],
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
})

export default Credential;