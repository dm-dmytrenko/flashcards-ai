import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bycrypt from "bcryptjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hashPassword(password: string) {
  return await bycrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashed: string) {
  return await bycrypt.compare(password, hashed);
}
