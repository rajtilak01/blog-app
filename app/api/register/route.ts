import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export const registerUser = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  try {
    const user = await User.findOne({ email });

    if (user) return NextResponse.json(new Error("User already exists"));

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      new Error("Something went wrong while registering user")
    );
  }
};
