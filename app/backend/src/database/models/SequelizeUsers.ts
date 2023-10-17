import { DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeUser extends Model<
InferAttributes<SequelizeUser>,
InferCreationAttributes<SequelizeUser>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

SequelizeUser.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    },
    username: { type: DataTypes.STRING(50), allowNull: false,
    },
    role: { type: DataTypes.STRING(50), allowNull: false,
    },
    email: { type: DataTypes.STRING(50), allowNull: false,
    },
    password: { type: DataTypes.STRING(100), allowNull: false,
    },
  },
  { sequelize: db, modelName: 'users', tableName: 'users', timestamps: false,
  },
);

export default SequelizeUser;
