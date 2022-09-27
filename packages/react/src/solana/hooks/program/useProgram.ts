import {
  createSOLQueryKeyWithNetwork,
  neverPersist,
} from "../../../core/query-utils/query-key";
import { RequiredParam } from "../../../core/types/shared";
import { useSDK } from "../../providers/base";
import { programAccountTypeQuery } from "./useProgramAccountType";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  NFTCollection,
  NFTDrop,
  ThirdwebSDK,
  Token,
} from "@thirdweb-dev/solana";
import invariant from "tiny-invariant";

type ProgramMap = Readonly<{
  "nft-collection": NFTCollection;
  "nft-drop": NFTDrop;
  token: Token;
}>;

type ProgramType = keyof ProgramMap;

export function programQuery<TProgramType extends ProgramType>(
  queryClient: QueryClient,
  sdk: RequiredParam<ThirdwebSDK>,
  address: RequiredParam<string>,
  type?: TProgramType,
) {
  const network = sdk?.metaplex.cluster;
  return {
    queryKey: neverPersist(
      createSOLQueryKeyWithNetwork(
        ["program-instance", address] as const,
        network || null,
      ),
    ),
    queryFn: (async () => {
      invariant(sdk, "sdk is required");
      invariant(address, "Address is required");
      // if the type is not passed in explicitly then we'll try to resolve it
      if (!type) {
        // why do we call `fetchQuery` here instead of calling the sdk directly?
        // while we can never persist the program itself to the cache we can persist the type!
        // (and this will be triggered by fetching the query on the queryClient)
        type = await queryClient.fetchQuery(
          programAccountTypeQuery(sdk, address),
        );
      }
      switch (type) {
        case "nft-collection":
          return await sdk.getNFTCollection(address);
        case "nft-drop":
          return await sdk.getNFTDrop(address);
        case "token":
          return await sdk.getToken(address);
        default:
          throw new Error("Unknown account type");
      }
      // this is the magic that makes the type inference work
    }) as () => Promise<ProgramMap[TProgramType]>,
    enabled: !!sdk && !!network && !!address,
    // this cannot change as it is unique by address & network
    cacheTime: Infinity,
    staleTime: Infinity,
  };
}

export function useProgram<TProgramType extends ProgramType>(
  address: RequiredParam<string>,
  type?: TProgramType,
) {
  const queryClient = useQueryClient();
  const sdk = useSDK();
  return useQuery(programQuery(queryClient, sdk, address, type));
}

export type UseProgramResult = ReturnType<typeof useProgram>;