import TestingUnit from './testing-unit';
import { assertType, is } from '../../errors/runtime/type-assertions';
import wrapTestFunction from '../wrap-test-function';

export default class Test extends TestingUnit {
    constructor (testFile) {
        super(testFile);

        this.fixture = testFile.currentFixture;

        this.fn       = null;
        this.beforeFn = null;
        this.afterFn  = null;

        return this.apiOrigin;
    }

    _add (name, fn) {
        assertType(is.string, 'apiOrigin', 'The test name', name);
        assertType(is.function, 'apiOrigin', 'The test body', fn);

        this.name = name;
        this.fn   = wrapTestFunction(fn);

        if (this.testFile.collectedTests.indexOf(this) < 0)
            this.testFile.collectedTests.push(this);

        return this.apiOrigin;
    }

    _before$ (fn) {
        assertType(is.function, 'before', 'test.before hook', fn);

        this.beforeFn = wrapTestFunction(fn);

        return this.apiOrigin;
    }

    _after$ (fn) {
        assertType(is.function, 'after', 'test.after hook', fn);

        this.afterFn = wrapTestFunction(fn);

        return this.apiOrigin;
    }
}

TestingUnit._makeAPIListForChildClass(Test);
