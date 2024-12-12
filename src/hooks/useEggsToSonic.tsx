import { Address, formatEther} from 'viem';
import { EggsContract } from '../providers/contracts';
import { useAccount, useReadContract } from 'wagmi';
import { parseEther } from 'viem';

export default function useEggsToSonic(eggs: string) {
    const { abi, address } = EggsContract;
    const { address: _address } = useAccount();
    const value = parseEther(eggs.toString());
    const {data, isSuccess, isPending, isError, error, refetch} = useReadContract({
            abi, 
            address : address as Address,
            functionName: "EGGStoSONIC",
            args: [value],
    });

    //@ts-expect-error
    const balance = data ? formatEther(data) : "0";

    return { data: balance, isSuccess, isPending, isError, error, refetch };
}