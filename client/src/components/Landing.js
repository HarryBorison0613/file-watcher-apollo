import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { createHash } from 'crypto';
import { QRCodeCanvas } from 'qrcode.react';

import contract from '../artifacts/contract.json';
import Input from './Input';
import Section from './Section';
import path from 'path';

const address = "0x562e21eCaAD4C9a6798B9b52888382B530f35897";
const abi = contract.abi;

const Landing = () => {

  const timeStamp = useSelector((state) => state.Event.timeStamp);
  const location = useSelector((state) => state.Event.location);
  const fpath = useSelector((state) => state.Event.path);
  const { ethereum } = window;
  // const fr = new FileReader();
  const [txhash, setTxHash] = useState("");
  const [tmhash, setTmHash] = useState("");
  const [txData, setTxData] = useState("");

  // fr.onload = async () => {
  //   result = await sha256(fr.result);
  // }

  useEffect(() => {
    SetInfo();
  }, [timeStamp, location]);

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const checkWalletIsConnected = async () => {
    if (!ethereum) {
      console.log("Make sure you have Metamask installed.");
      return;
    } else {
    }
    await window.ethereum.enable();
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
    } else {
      console.log("No authorized account found");
    }
  }
  const SetInfo = async () => {
    try {
      if (ethereum) {
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contracts = new ethers.Contract(address, abi, signer);
        const tx = await contracts.setInfo(timeStamp, location.latitude.toString(), location.longitude.toString());
        console.log("tx", tx)
        console.log('txhash', tx.hash);
        setTxHash(tx.hash);
        setTxData(tx.data);
        setTmHash(createHash('sha256').update(timeStamp).digest('hex'));
      } else {
        console.log("Ethereum doens't exist");
      }
    } catch (err) {
      console.log("catched err", err);
    }
  }
  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={txhash}
      size={300}
      bgColor={"#00ff00"}
      level={"H"}
    />
  );

  return (
    <Section className="landing">
      <Input id="path" label="Set your Path:" type="text" submit="Set Path" />
      <div>
        <div>
          <div className='desc'>
            TimeStamp: {timeStamp}
          </div>
        </div>
        <div>
          <div className='desc'>
            Location:
          </div>
          <div className='subdesc'>
            longitude: {location.longitude}
          </div>
          <div className='subdesc'>
            latitude: {location.latitude}
          </div>
        </div>
        <div className='hashGroup'>
          <div className='hash'>
            HASH
          </div>
          <div className='hashcontent'>
            <div className='qrcode'>
              {qrcode}
            </div>
            <div className='hashvalue'>
              <div>
                Transaction Hash: {txhash}
              </div>
              <div>
                Hash Value: {tmhash}
              </div>
              <div style={{ overflow: 'scroll' }}>
                Transaction Data: {txData}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Landing;
