import exp from "constants";
import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('GSN-Schema', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;