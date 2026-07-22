import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places",
  );

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 char"),
  slug: z.string().min(3, "Slug must be at least 3 char"),
  category: z.string().min(3, "Category must be at least 3 char"),
  brand: z.string().min(3, "Brand must be at least 3 char"),
  description: z.string().min(3, "Description must be at least 3 char"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing user in

export const signInFormSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .min(3, "Email must be at least 3 characters"),
  password: z.string().min(3, { message: "Password must be at least 3 characters" }),
});

// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email({ error: "Invalid email address" }),
    password: z.string().min(3, { message: "Password must be at least 3 characters" }),
    confirmPassword: z.string().min(3, "Confirm password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will attach the error to the confirmPassword field
  });

// cart Schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Product slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a non-negative integer"),
  image: z.string().min(1, "Product image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart ID is required"),
  userId: z.string().optional().nullable(),
});

export const shippingAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, "Name must contain only letters"),
  streetAddress: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, "Street Address must contain only letters"),
  city: z
    .string()
    .min(3, "city must be at least 3 characters")
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, "City must contain only letters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z
    .string()
    .min(3, "Country must be at least 3 characters")
    .regex(/^[a-zA-Z\u0600-\u06FF\s]+$/, "Country must contain only letters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

// Schema for inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  shippingAddress: shippingAddressSchema,
});

// Schema for inserting order item
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// Payment Result Schema & Type
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
});
