const { z } = require("zod");

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Name should be at least 3 characters long" })
    .max(50, { message: "Name should not exceed 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" }),
});

const postSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters long" }),
  content: z
    .string()
    .min(3, { message: "Content should be at least 3 characters long" }),
});

const commentSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Content should be at least 3 characters long" }),
  postId: z.number().int().positive({ message: "Invalid post id" }),
});

module.exports = {
  userSchema,
  loginSchema,
  postSchema,
  commentSchema,
};
