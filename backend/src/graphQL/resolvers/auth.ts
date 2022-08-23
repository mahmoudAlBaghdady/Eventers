import User from "../../database/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
const { JWT_SECRET } = config;
export default module.exports = {
  emailCheck: async (args: any) => {
    const existingUser = await User.findOne({ email: args.email });
    if (existingUser) {
      return { found: true };
    }
    return { found: false };
  },
  createUser: async (args: any) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcryptjs.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  login: async (args: any) => {
    const { email, password } = args;
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      throw new Error("user or password incorrect");
    }
    const isEqual = await bcryptjs.compare(password, userFound.password);
    if (!isEqual) {
      throw new Error("user or password incorrect");
    }
    const token = jwt.sign(
      { email: userFound.email, userId: userFound.id },
      JWT_SECRET!,
      { expiresIn: "2h" }
    );
    console.log(userFound);
    return {
      userId: userFound.id,
      email: userFound.email,
      token: token,
      tokenExpiration: 2,
    };
  },
};
