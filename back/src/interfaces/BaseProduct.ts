interface BaseProduct {
    name: string;
    description: string;
    images: Buffer[];
    price: Map<string, number>; // It's a map, allows different prices
    stock: number;
    sku: string;
}

export default BaseProduct;