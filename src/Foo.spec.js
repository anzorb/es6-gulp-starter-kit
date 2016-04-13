import Foo from './Foo';

describe('Foo', () => {
    let foo;

    beforeEach(() => {
        foo = new Foo('test-user');
    });

    afterEach(() => {
        foo = undefined;
    });

    describe('api', () => {

        it('should greet', () => {
            expect(foo.greet()).toBe('hi, test-user! Welcome');
        });

    });

});
