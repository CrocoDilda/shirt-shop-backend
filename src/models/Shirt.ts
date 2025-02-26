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
      type: DataTypes.DECIMAL,
      allowNull: false, // Указать, если поле обязательно
      get() {
        // Преобразуем цену в число перед отправкой на фронт
        const price = this.getDataValue("price")
        return parseFloat(price.toString())
      },
      set(value: string) {
        this.setDataValue("price", value.toString())
      },
    },
    popularity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model_sizes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    color: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    model_height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "shirts",
    timestamps: false, // Если в базе нет полей createdAt и updatedAt
  }
)

export default Shirt
