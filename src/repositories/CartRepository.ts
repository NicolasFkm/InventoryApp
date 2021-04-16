import { SaleStatus } from "@enumerators/SaleStatus";
import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";
import Cart, { ICart } from "@models/Cart";
import { CartItemAttributes } from "@models/CartItem";
import { IUser } from "@models/User";
import { UpdateWriteOpResult } from "mongoose";

export default class CategoryRepository {

    async getById(id: string): Promise<ICart | null> {
        let cart = await Cart.findById(id);

        return cart;
    }

    async getAll(): Promise<ICart[]> {
        const cart = await Cart.find()

        return cart;
    }

    async create(cart: ICart): Promise<ICart> {

        const createdCart = await Cart.create(cart);

        return createdCart;
    }

    async addItem(id: string, cartItem: CartItemAttributes): Promise<ICart> {

        const cart = await Cart.findByIdAndUpdate(id,
            { $push: { items: cartItem } },
            { new: true, useFindAndModify: false });

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        return cart;
    }

    async removeItem(id: string, productId: string): Promise<ICart> {

        const cart = await Cart.findByIdAndUpdate(id,
            { $pull: { items: { product: productId } } },
            { new: true, useFindAndModify: false });

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        return cart;
    }

    async updateItemQuantity(id: string, cartItem: CartItemAttributes): Promise<ICart> {

        const cart = await Cart.findById(id);

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        cart.items = cart.items!.map(item => {
            if (item.product != cartItem.product)
                return item;

            item.quantity = cartItem.quantity;
            return item;
        })

        cart.save();

        return cart;
    }

    async clearCart(id: string): Promise<ICart> {
        const cart = await Cart.findByIdAndUpdate(id,
            { $set: { items: [] } },
            { new: true, useFindAndModify: false });

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        return cart;
    }


    async update(id: string, cart: ICart): Promise<UpdateWriteOpResult> {
        const updatedCart = await Cart.updateOne({ id }, { $set: cart }, { upsert: true, new: true });

        return updatedCart;
    }

    async getOpenCartByUserId(user: IUser): Promise<ICart | null> {
        const updatedCart = await Cart.findOne({ user: user, status: SaleStatus.Created }, {new: true});

        return updatedCart;
    }

}