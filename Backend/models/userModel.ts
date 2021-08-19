import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { defaultValueSchemable } from "sequelize/types/lib/utils";
import { database } from "../config/database";
import { Note } from "./notesModel";

export class User extends Model {
  public userId!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    userName: {
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: false
    }
  },
  {
    tableName: "users",
    sequelize: database,
    timestamps: false
  }
);

console.log("In userModel.ts");
User.sync({ force: false }).then(() => console.log("User table created"));
