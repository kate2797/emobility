/**
 * A module storing Chargetrip configuration.
 */
import { createClient, defaultExchanges } from "@urql/core";
import { CHARGETRIP_CLIENT_ID, CHARGETRIP_APP_ID } from "../constants/secrets";

const headers = {
  "x-client-id": CHARGETRIP_CLIENT_ID,
  "x-app-id": CHARGETRIP_APP_ID,
};

export const client = createClient({
  url: "https://api.chargetrip.io/graphql",
  fetchOptions: {
    method: "POST",
    headers,
  },
  exchanges: [...defaultExchanges],
});
