export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string; 
  };


export type CoinCounter = {
    [key: number]: number | undefined; // Key is a number, value is number or undefined
  };