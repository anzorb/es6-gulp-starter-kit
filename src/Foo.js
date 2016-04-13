import Bar from './Bar';
import { stub } from 'mocktail';

/**
 * Class Foo. Does things
 * @param {String} name
 */

class Foo extends Bar {
    /**
     * Draws the inside part of the opening (the door itself, transparent window, etc)
     * @private
     * @returns {THREE.Mesh}
     */
    greet() {
        return `hi, ${this.name}! ${this.welcomeString}`;
    }
}

class FooMock extends Bar {
    greet() {
        return `hi, ${this.name}! Welcome`;
    }
}

export default stub(Foo, FooMock);
