import { DataTypes } from "sequelize"
import sequelize from "../db"

const Shirt = sequelize.define(
  "Shirt",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sizes: {
      type: DataTypes.JSONB,
      allowNull: false, // Можно настроить на `false`, если оно обязательно
    },
    price: {
      type: DataTypes.DECIMAL, // Для numeric
      allowNull: false, // Указать, если поле обязательно
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE, // Для timestamp
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE, // Для timestamp
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING, // Для character varying
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING, // Для character varying
      allowNull: false,
    },
    model_sizes: {
      type: DataTypes.STRING, // Для character varying
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING, // Для character varying
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING, // Для character varying
      allowNull: false,
    },
    article: {
      type: DataTypes.STRING, // Для character varying
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Для ARRAY
      allowNull: false,
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Для ARRAY
      allowNull: false,
    },
    model_height: {
      type: DataTypes.STRING, // Для character varying
      allowNull: false,
    },
  },
  {
    tableName: "shirts",
    timestamps: false, // Если в базе нет полей createdAt и updatedAt
  }
)

export default Shirt
