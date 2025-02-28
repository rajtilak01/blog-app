import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/db";

export async function POST(req: NextRequest) {
  connectDB();
  const { name, email, password } = await req.json();
  console.log("name", name);
  console.log("email", email);
  console.log("password", password);
  try {
    const user = await User.findOne({ email });

    if (user)
      return NextResponse.json({
        error: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log("new user", newUser);
    // await newUser.save();
    return NextResponse.json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      new Error("Something went wrong while registering user")
    );
  }
}
