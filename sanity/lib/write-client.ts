import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  //if we set it to TRUE it will cache the content every 60 seconds, This is ISR so here what happens if you update the content in sanity by adding new blog bt this will not be shown on the screen immediately it will take 60 seconds to revalidate and then updates

  //but if we make it false then it will shown immediately this is the difference

  // Set to false if statically generating pages, using ISR or tag-based revalidation
});

if (!writeClient.config().token) {
  throw new Error("Write Token Not Found");
}
