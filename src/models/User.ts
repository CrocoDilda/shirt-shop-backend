import { DataTypes } from "sequelize"
import sequelize from "../db"

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Используем NOW для установки текущего времени
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_password_change_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    avatar_icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email должен быть уникальным
      validate: {
        isEmail: true, // Проверка, что это email
      },
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false, // Отключаем автоматическое добавление полей createdAt и updatedAt
  }
)

export default User
