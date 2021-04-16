import sinon from 'sinon';
import { expect } from 'chai';
import SupplierService from "@services/SupplierService";
import { ISupplier } from "@models/Supplier";
import faker from 'faker';

describe("SupplierService", () => {
    afterEach(() => {
        console.log("Next test: ")
    })

    it("should pass", () => {
        expect(true).to.be.true;
    })
})