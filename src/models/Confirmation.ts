import { Model, DataTypes } from "sequelize"
import sequelize from "../db"

export class Confirmation extends Model {
  public email!: string
  public code!: number
  public confirmed!: boolean
  public createdAt!: Date
}

Confirmation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "confirmation",
    timestamps: false,
  }
)

export default Confirmation
