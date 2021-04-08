import Coupon, { ICoupon } from "@models/Coupon";
import { UpdateWriteOpResult } from "mongoose";

export default class CouponRepository {

    async getById(id: string): Promise<ICoupon | null> {
        const coupon = await Coupon.findById(id);

        return coupon;
    }

    async getAll(): Promise<ICoupon[]> {
        const coupon = await Coupon.find();

        return coupon;
    }

    async create(coupon: ICoupon): Promise<ICoupon> {

        const createdCoupon = await Coupon.create(coupon);

        return createdCoupon;
    }

    async update(id: string, coupon: ICoupon): Promise<UpdateWriteOpResult> {
        const updatedCoupon = await Coupon.updateOne({ id }, coupon)

        return updatedCoupon;
    }

}