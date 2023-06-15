import { DataTypes, INTEGER, STRING } from "sequelize";
import db from '../db/connection';

const Employee = db.define('Employee', {
    idEmployee: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1,50]
        }
    },
    firstname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1,50]
        }
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull : false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
            notNull: true,
            len: [1,45]
        }
    },
    phone: {
        type: DataTypes.NUMBER,
        allowNull : false,
        validate: {
            isNumeric: true,
            notEmpty: true,
            notNull: true,
        }
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

export default Employee;