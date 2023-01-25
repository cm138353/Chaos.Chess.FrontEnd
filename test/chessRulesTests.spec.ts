import { assert } from '@aurelia/testing';
import { bootstrapTestEnvironment } from './bootstrapTestEnvironment.spec';

bootstrapTestEnvironment();


// An assumption is being made you called the code defined in the first part
// of these docs to set up the environment.

describe('My basic test', function () {
    it('should pass test', async function () {

        let test = "hello world";
        assert.strictEqual(test, 'hello world');
    });
});


