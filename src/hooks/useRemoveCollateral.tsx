import {Address, parseEther} from "viem";
import { EggsContract } from "../providers/contracts";
import useWriteContractAndWaitForConfirm from "./useWriteContractAndWaitForConfirm";


export default function useRemoveCollateral(){
    const {writeContract, isError, isSuccess, isConfirming, isPending, reset} = useWriteContractAndWaitForConfirm();
    const {abi, address} = EggsContract;

    const removeCollateral = (amount: string) =>{
        const collateral =  parseEther(amount.toString());
        writeContract({
            abi,
            address : address as Address,
            functionName: "removeCollateral",
            args: [collateral],
        });
    }
    return {removeCollateral,isError, isSuccess, isConfirming, isPending, reset};
}