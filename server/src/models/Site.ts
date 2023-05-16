import { DataTypes, INTEGER, STRING } from "sequelize";
import db from '../db/connection';
import Client from "./Client";

const Site = db.define('Site', {
    idSite: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull : false,
    },
    address: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [1,50]
        }
    },
    idClient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        },
    }
}, {
    timestamps: false
});

export default Site;