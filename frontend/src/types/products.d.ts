export interface Products{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    ratingRate: number;
    ratingCount: number;
}

export interface ProductsError {
    response?: {
      data?: {
        error?: string;
        message: string;
      };
      status?: number;
      statusText?: string;
    };
    message: string;
  }



  export interface ProductDetail {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    ratingRate: number;
    ratingCount: number;
  }
  
  export interface ProductDetailError {
    response?: {
      data: { message: string };
    };
  }
  