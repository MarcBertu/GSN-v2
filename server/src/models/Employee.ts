import { DataTypes, INTEGER, STRING } from "sequelize";
import db from '../db/connection';

const Employee = db.define('Employee', {
    idEmployee: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    mail: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            len: [5,45]
        }
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull : true,
    },
    telephone: {
        type: DataTypes.NUMBER,
        allowNull : true,
        validate: {
            isNumeric: true
        }
    },
    fax: {
        type: DataTypes.NUMBER,
        allowNull : true,
        validate: {
            isNumeric: true
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull : true,
    },
    siret: {
        type: DataTypes.STRING,
        allowNull : true,
    },
    siren: {
        type: DataTypes.STRING,
        allowNull : true,
    },
    numCompany: {
        type: DataTypes.INTEGER,
        allowNull : true,
    }
}, {
    timestamps: false
});

export default Employee;