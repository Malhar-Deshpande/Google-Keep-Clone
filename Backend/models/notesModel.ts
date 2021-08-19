import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { database } from "../config/database";
import { User } from "./userModel";

export class Note extends Model {
  public noteId!: number;
  public userId!: number;
  public noteTitle!: string;
  public noteContent!: string;
  public isPinned!: boolean;
  public backgroundColor!: string;
  public createdAt!: Date;
  //  public image!:Blob
  public isDeleted!: boolean;
  public label!: string;
  //  public reminder!:Date
}

Note.init(
  {
    noteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    noteTitle: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false
    },
    noteContent: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    backgroundColor: {
      type: DataTypes.STRING(15),
      defaultValue: "white"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: false
    },
    // image: {
    //   type: DataTypes.BLOB
    // },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    label: {
      type: DataTypes.STRING(20)
    }
    // reminder: {
    //     type: DataTypes.DATE
    //   }
  },
  {
    tableName: "notes",
    sequelize: database,
    timestamps: false
  }
);
Note.belongsTo(User, { foreignKey: "userId", targetKey: "userId" });
User.hasMany(Note, { foreignKey: "userId", sourceKey: "userId" });
Note.sync({ force: false }).then(() => console.log("Notes table created"));
