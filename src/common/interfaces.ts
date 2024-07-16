export interface NewProduct {
  name: string
  price: number
}

export interface Product extends NewProduct {
  id: number
  amount: number
}
