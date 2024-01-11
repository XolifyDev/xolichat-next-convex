import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const key = process.env.NEXT_PUBLIC_JWT!;

export function tokenDecode ({token}: { token: string }) {
  jwt.verify(token, key,function(err, decoded) {
      if (err){
          console.log('VERIFY ERROR', err);
      }
      if (decoded){
          console.log('VERIFY', decoded);
          return decoded;
      }
  });
}