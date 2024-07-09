import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/sequelize';

interface OrderAttributes {
  id: string;
  userId: string;
  ticketId: string;
  status: string;
  movieIdPage: string; 
}

export class Order extends Model<OrderAttributes> {
  public id!: string;
  public userId!: string;
  public ticketId!: string;
  public status!: string;
  public movieIdPage!: string; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieIdPage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'order',
  }
);