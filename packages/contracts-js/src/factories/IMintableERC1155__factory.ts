/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  IMintableERC1155,
  IMintableERC1155Interface,
} from "../IMintableERC1155";
import type { Provider } from "@ethersproject/providers";
import { Contract, Signer, utils } from "ethers";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "mintedTo",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenIdMinted",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "quantityMinted",
        type: "uint256",
      },
    ],
    name: "TokensMinted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IMintableERC1155__factory {
  static readonly abi = _abi;
  static createInterface(): IMintableERC1155Interface {
    return new utils.Interface(_abi) as IMintableERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IMintableERC1155 {
    return new Contract(address, _abi, signerOrProvider) as IMintableERC1155;
  }
}