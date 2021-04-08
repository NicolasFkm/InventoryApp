import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { ICart } from "@models/Cart";
import { CartItemAttributes } from "@models/CartItem";
import CartRepository from "@repositories/CartRepository";

export default class CartService {

    public cartRepository: CartRepository;

    constructor() {
        this.cartRepository = new CartRepository();
    }

    async getById(id: string): Promise<ICart | null> {
        const cart = await this.cartRepository.getById(id);

        return cart;
    }

    async getAll(): Promise<ICart[]> {
        const cart = await this.cartRepository.getAll();

        return cart;
    }                                                                                                                                                      
    async removeItem(id: string, item: CartItemAttributes): Promise<ICart | null> {
        const cart = await this.cartRepository.removeItem(id, item.productId);
        
        return cart;
    }                                                                                                                                                 
    async clear(id: string): Promise<ICart | null> {
        const cart = await this.cartRepository.clearCart(id);
        
        return cart;
    }                                                                                                                                            
    async updateCartItem(id: string, item: CartItemAttributes): Promise<ICart | null> {
        const cart = await this.cartRepository.updateItemQuantity(id, item);

        return cart;
    }                                                                                                                                           
    async addItem(id: string, item: CartItemAttributes): Promise<ICart | null> {
        const cart = await this.cartRepository.addItem(id, item);
            
        return cart;
    }

    async create(cart: ICart): Promise<ICart> {

        this.validate(cart);

        const createdCart = this.cartRepository.create(cart);;

        return createdCart;
    }

    async update(id: string, updateCart: ICart): Promise<boolean> {
        this.validate(updateCart);

        const updatedCart = await this.cartRepository.update(id, updateCart)

        return updatedCart.ok == 1;
    }

    validate(cart: ICart): void {
        if (cart.user == null || cart.user == undefined)
            throw new InvalidArgumentException("Cart name is invalid.");
    }

}