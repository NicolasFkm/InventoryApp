import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";
import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { ICart } from "@models/Cart";
import { CartItemAttributes } from "@models/CartItem";
import CartRepository from "@repositories/CartRepository";
import UserService from "./UserService";

export default class CartService {

    public cartRepository: CartRepository;
    public userService: UserService;

    constructor() {
        this.cartRepository = new CartRepository();
        this.userService = new UserService();
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
        const cart = await this.cartRepository.removeItem(id, item.product);

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

        const createdCart = this.cartRepository.create(cart);;

        return createdCart;
    }

    async update(id: string, updateCart: ICart): Promise<boolean> {
        const updatedCart = await this.cartRepository.update(id, updateCart)

        return updatedCart.ok == 1;
    }

}