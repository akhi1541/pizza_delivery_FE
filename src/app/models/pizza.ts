export interface Pizza {
    _id:string;
    pizzaId: string;         
    name: string;            
    description: string;     
    price: number;           
    imageUrl: string;        
    size: 'small' | 'medium' | 'large';
}




export interface CartItem {
    itemId: string;
    userId: string;
    Qty: number;
    pizzaDetails: Pizza;
}