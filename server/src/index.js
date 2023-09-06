//packages
import express from "express";
import session from "express-session";
import passport from "passport";

// sequelize
import sequelize from "./db.js";

// routes
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";

//models
import Post from "./models/post.js";
import User from "./models/user.js";
import PostLike from "./models/postLike.js";

// utils
import configurePassport from "./utils/passportConfig.js";

const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

configurePassport();

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(userRoutes);
app.use(postRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.log(err);
  });

User.hasMany(Post);
Post.belongsTo(User);
User.belongsToMany(Post, {
  through: PostLike,
  as: "likedPosts",
});
Post.belongsToMany(User, {
  through: PostLike,
  as: "likedByUsers",
});

await sequelize.sync();
console.log("All models are synced!");

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
