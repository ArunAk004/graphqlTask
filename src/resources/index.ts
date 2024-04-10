import { LazyQueryHookOptions, OperationVariables } from "@apollo/client";

export const queryOptions: LazyQueryHookOptions<any, OperationVariables> = {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  }