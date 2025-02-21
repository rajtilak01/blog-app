import User from "@/models/User";
import bcrypt from "bcrypt";
export const getUser = async (credentials) => {
  const { username, password } = credentials;
  const user = await User.findOne({ username });
    if (!user) {
        return null;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return null;
    }
    return user;
};