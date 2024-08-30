import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import SimpleDAOABI from '../../artifacts/contracts/SimpleDAO.sol/SimpleDAO.json'; // ABI file

const contractAddress = '0x8E484D05aE1B178A09B0F07E36b59935721fC11f';

const App = () => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [description, setDescription] = useState('');
    const [proposals, setProposals] = useState([]);
    const [proposalId, setProposalId] = useState('');

    useEffect(() => {
  const init = async () => {
    try {
      if (!window.ethereum) {
        console.error('No Ethereum provider detected. Install MetaMask or another Ethereum provider.');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer);
      console.log(contractAddress);
      console.log(SimpleDAOABI);
      
      const contract = new ethers.Contract(contractAddress,SimpleDAOABI.abi, signer);
      console.log("Contract: ",contract)
      setProvider(provider);
      setContract(contract);

      const accounts = await provider.listAccounts();
      if (accounts.length === 0) {
        console.error('No accounts found. Ensure you are connected to MetaMask.');
        return;
      }
      setAccount(accounts[0]);

      const proposalCount = await contract.proposalCount();
      let proposals = [];
      for (let i = 1; i <= proposalCount; i++) {
        const proposal = await contract.getProposal(i);
        proposals.push({ id: i, ...proposal });
      }
      setProposals(proposals);
    } catch (error) {
      console.error('Error initializing the contract:', error);
    }
  };

  init();
}, []);


    const handleCreateProposal = async () => {
      console.log("description: ",description)
        const tx = await contract.createProposal(description);
        await tx.wait();
        // Refresh proposals
        const proposalCount = await contract.proposalCount();
        let proposals = [];
        for (let i = 1; i <= proposalCount; i++) {
            const proposal = await contract.getProposal(i);
            proposals.push({ id: i, ...proposal });
        }
        setProposals(proposals);
    };

    const handleVote = async () => {
        const tx = await contract.vote(proposalId);
        await tx.wait();
        // Refresh proposals
        const proposalCount = await contract.proposalCount();
        let proposals = [];
        for (let i = 1; i <= proposalCount; i++) {
            const proposal = await contract.getProposal(i);
            proposals.push({ id: i, ...proposal });
        }
        setProposals(proposals);
    };

    return (
        <div>
            <h1>Simple DAO</h1>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Proposal description"
            />
            <button onClick={handleCreateProposal}>Create Proposal</button>
            <br />
            <input
                type="number"
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
                placeholder="Proposal ID to vote"
            />
            <button onClick={handleVote}>Vote</button>
            <h2>Proposals</h2>
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        <strong>ID:</strong> {proposal.id} <br />
                        <strong>Description:</strong> {proposal.description} <br />
                        <strong>Vote Count:</strong> {proposal.voteCount.toString()} <br />
                        <strong>Proposer:</strong> {proposal.proposer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
