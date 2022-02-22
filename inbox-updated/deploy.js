const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const dotenv = require('dotenv');
const { abi, evm } = require('./compile');

dotenv.config();
const provider = new HDWalletProvider(
    process.env.SEED_PHRASE,
    'https://rinkeby.infura.io/v3/42b22014fc704adea44d3e65731592ba',
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account :', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data : evm.bytecode.object, arguments : ['Hi there!'] })
        .send({ gas : '1000000', from : accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();