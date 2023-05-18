import { DataTypes, INTEGER, STRING } from "sequelize";
import db from '../db/connection';

const Task = db.define('Task', {
    idTask: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    label: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    description: {
        type: DataTypes.CHAR(150),
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            len: [3, 150],
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    heureDeb: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    heureFin: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    idEmployee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    idClient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    },
    idSite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
})

export default Task;