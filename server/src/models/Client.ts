import { DataTypes, INTEGER, STRING } from "sequelize";
import db from '../db/connection';

const Client = db.define('Client', {
    idClient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull : false,
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
        type: DataTypes.DECIMAL(10),
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true,
            notNull: true,
            len: [10,10]
        }
    },
    fax: {
        type: DataTypes.DECIMAL(10),
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true,
            notNull: true,
            len: [10,10]
        }
    },
    siret: {
        type: DataTypes.STRING(14),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    siren: {
        type: DataTypes.STRING(9),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    isVerified: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true,
            notNull: true
        }
    },
}, {
    timestamps: false,
    freezeTableName: true,
})

export default Client;