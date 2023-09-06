import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const PostLike = sequelize.define("post-like", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

export default PostLike;
