import { Coupon, CouponCreationAttributes } from "@models/Coupon";

export default class CouponRepository {

    async getById(id: number): Promise<Coupon | null> {
        const coupon = await Coupon.findByPk(id, { include: [{ all: true }] });

        return coupon;
    }

    async getAll(): Promise<Coupon[]> {
        const coupon = await Coupon.findAll({ include: [{ all: true }] });

        return coupon;
    }

    async add(coupon: CouponCreationAttributes): Promise<Coupon> {

        const createdCoupon = await Coupon.create(coupon);

        return createdCoupon;
    }

    async update(Coupon: Coupon, updateData: Partial<CouponCreationAttributes>): Promise<Coupon | undefined> {
        const updatedCoupon = await Coupon?.update(updateData)

        return updatedCoupon;
    }

}