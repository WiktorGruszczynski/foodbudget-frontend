export interface ProductResponse {
  id: string;
  name: string;
  ean: string | null;
  manufacturer: string | null;
  quantity: number;
  quantityUnit: string;
  nutrientUnit: string;
  energyKcal: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugars: number;
  fiber: number;
  protein: number;
  salt: number;
  price: number;
  createdAt: string; 
  updatedAt: string;
}

export interface ProductRequest {
  name: string;
  ean: string;
  manufacturer: string;
  quantity: number;
  quantityUnit: string;
  nutrientUnit: string;
  energyKcal: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugars: number;
  fiber: number;
  protein: number;
  salt: number;
  price: number;
}

export interface Product {
    id: string;
    name: string;
    ean: string;
    manufacturer: string;
    quantity: number;
    quantityUnit: string;
    nutrientUnit: string;
    energyKcal: number;
    fat: number;
    saturatedFat: number;
    carbohydrates: number;
    sugars: number;
    fiber: number;
    protein: number;
    salt: number;
    price: number;
}