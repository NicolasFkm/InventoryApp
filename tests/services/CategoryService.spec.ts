import sinon from 'sinon';
import { expect } from 'chai';
import CategoryService from "@services/CategoryService";
import { ICategory } from "@models/Category";
import faker from 'faker';
import { suite, test } from '@testdeck/mocha';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';

@suite class CategoryServiceUnitTests {

    public categoryService = new CategoryService();

    @test async 'create should return category'(){
        const categoryService = new CategoryService();
        let category = {
            name: faker.name.findName()
        } as ICategory;

        const categoryRepositoryMock = sinon.mock(categoryService.categoryRepository);
        categoryRepositoryMock.expects("create").returns(Promise.resolve(category));

        // sinon.stub(categoryService.categoryRepository, 'create').returns(Promise.resolve(category));

        let created = await categoryService.create(category);

        expect(created).equal(category);
        categoryRepositoryMock.verify();
    }

    @test 'validate should throw exception when category is invalid'(){
        const categoryService = new CategoryService();
        
        let category = {
            name: ""
        } as ICategory;

        expect(()=> {categoryService.validate(category)}).to.throw(InvalidArgumentException);
    }
}