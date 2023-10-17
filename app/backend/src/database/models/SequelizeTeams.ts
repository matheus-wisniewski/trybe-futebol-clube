import { DataTypes, Model, InferAttributes, InferCreationAttributes,
  CreationOptional } from 'sequelize';
import db from '.';

class SequelizeTeam extends Model<InferAttributes<SequelizeTeam>,
InferCreationAttributes<SequelizeTeam>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeam.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true,
    },
    teamName: { type: DataTypes.STRING, allowNull: false,
    },
  },
  {
    sequelize: db, modelName: 'teams', tableName: 'teams', timestamps: false, underscored: true,
  },
);

export default SequelizeTeam;
