import Coupon, { ICoupon } from "@models/Coupon";

export default class CouponRepository {

    async getById(id: number): Promise<ICoupon | null> {
        const coupon = await Coupon.findById(id);

        return coupon;
    }

    async getAll(): Promise<ICoupon[]> {
        const coupon = await Coupon.find();

        return coupon;
    }

    async add(coupon: ICoupon): Promise<ICoupon> {

        const createdCoupon = await Coupon.create(coupon);

        return createdCoupon;
    }

    async update(Coupon: ICoupon, updateData: Partial<ICoupon>): Promise<ICoupon | undefined> {
        const updatedCoupon = await Coupon?.update(updateData)

        return updatedCoupon;
    }

}