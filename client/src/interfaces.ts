import { Product } from './types.tsx'

export interface GetProductsResponse {
    json(): PromiseLike<Product[]>;
    status: any;
    ok: GetProductsResponse;
    products: Product[];
}