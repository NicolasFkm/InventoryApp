import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";
import Cart, { ICart } from "@models/Cart";
import { CartItemAttributes } from "@models/CartItem";
import { UpdateWriteOpResult } from "mongoose";

export default class CategoryRepository {

    async getById(id: string): Promise<ICart | null> {
        const cart = await Cart.findById(id)
            .populate("products")

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

    async addItem(id: string, cartItem: CartItemAttributes): Promise<ICart | null> {

        const cart = await Cart.findByIdAndUpdate(id,
            { $push: { items: cartItem } },
            { new: true, useFindAndModify: false });

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        return cart;
    }

    async removeItem(id: string, productId: string): Promise<ICart | null> {

        const cart = await Cart.findByIdAndUpdate(id,
            { $pull: { items: { productId: productId } } },
            { new: true, useFindAndModify: false });

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        return cart;
    }

    async updateItemQuantity(id: string, cartItem: CartItemAttributes): Promise<ICart | null> {

        const cart = await Cart.findById(id);

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        cart.items = cart?.items.map(item => {
            if(item.productId != cartItem.productId)
                return item;
            
            item.quantity = cartItem.quantity;
            return item;
        })

        cart.save();

        return cart;
    }

    async clearCart(id: string): Promise<ICart | null> {
        const cart = await Cart.findByIdAndUpdate(id,
            { $set: { items: [] } },
            { new: true, useFindAndModify: false });

        if (cart == null) {
            throw new DataNotFoundException("Couldn't find the cart");
        }

        return cart;
    }


    async update(id: string, cart: ICart): Promise<UpdateWriteOpResult> {
        const updatedCart = await Cart.updateOne({ id }, cart)

        return updatedCart;
    }

}