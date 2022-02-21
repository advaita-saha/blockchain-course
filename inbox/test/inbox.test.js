const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());
let accounts;
let inbox;

beforeEach( async () => {
    // Get a list all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those contracts to
    // deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data : bytecode , arguments : ['Hi There'] })
        .send({ from : accounts[0], gas : '1000000' });

});

describe('Inbox Test', () => {
    it('deployment check', () => {
        assert.ok(inbox.options.address);
    });

    it('initial message check', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There');
    });

    it('setMessage check', async () => {
        await inbox.methods.setMessage('message changed')
            .send({ from : accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'message changed');
    });
});

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;
// beforeEach(() => {
//     car = new Car();
// });

// describe('Car Class Test', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });