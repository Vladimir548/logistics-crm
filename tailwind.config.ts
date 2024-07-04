import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend : {
    colors:{
      'secondary-cust':'#051a21',
      text:'#00CAE9',
      'text-dark':'#008DA7',
      border:'#006F87',
      'border-dark':'#005365',
      'text-cell':'#0ABDF0',
      'table-body':'#05181E',
      'table-hover':'#071e29'
    }
    }
  },
  darkMode: "class",
  plugins: [
    nextui(),
   ],
};
export default config;
