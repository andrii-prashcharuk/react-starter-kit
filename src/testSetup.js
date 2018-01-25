process.env.NODE_ENV = 'test';

require('babel-register')();

require.extensions['.scss'] = function () { return null; };

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
const exposedProperties = ['window', 'navigator', 'document'];
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
enzyme.configure({ adapter: new Adapter() });

global.document = document;
global.navigator = { userAgent: 'node.js' };
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

documentRef = document;
