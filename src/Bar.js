import { stub } from 'mocktail';

/**
 * Class Bar. Does things
 * @param {String} name
 */

const strings = ['Welcome', 'Willkommen', 'Bienvenue'];

const pickOneOutOfThree = () => Math.floor(Math.random(0, 2) * 3);

class Bar {
    constructor(name) {
        this.name = name;
    }

    /**
     * Welcome String getter
     */
    get welcomeString() {
        return strings[pickOneOutOfThree()];
    }
}

class BarMock {
    constructor(name) {
        this.name = name;
    }

    get welcomeString() {
        return 'Welcome';
    }
}

export default stub(Bar, BarMock);
