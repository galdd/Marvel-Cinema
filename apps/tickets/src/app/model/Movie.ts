import { DataTypes, Model, UUIDV4 } from 'sequelize';
import sequelize from '../config/sequelize';
import { v4 as uuidv4 } from 'uuid';

interface MovieAttributes {
  id: string;
  title: string;
  desc: string;
  img: string;
  imgTitle: string;
  imgSm: string;
  trailer: string;
  year: string;
  chronologicalOrder: number;
  length: string;
  movieIdPage: string;
}

export class Movie extends Model<MovieAttributes> {
  public id!: string;
  public title!: string;
  public desc!: string;
  public img!: string;
  public imgTitle!: string;
  public imgSm!: string;
  public trailer!: string;
  public year!: string;
  public chronologicalOrder!: number;
  public length!: string;
  public movieIdPage!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    imgTitle: {
      type: DataTypes.STRING,
    },
    imgSm: {
      type: DataTypes.STRING,
    },
    trailer: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    chronologicalOrder: {
      type: DataTypes.INTEGER,
    },
    length: {
      type: DataTypes.STRING,
    },
    movieIdPage: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    tableName: 'movie',
  },
);