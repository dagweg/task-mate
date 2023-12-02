import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

 
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }


  export function shortener(text: string,size:number): string {
    let result: string; // Declare the type of 'result' as string
  
    if (text.length > size) {
      result = text.substring(0, size) + "...";
    } else {
      result = text;
    }
  
    return result;
  }
  