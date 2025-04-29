import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { unstable_after as after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false }) //as we set here useCdn to false here views count will be automatically updated
    .fetch(STARTUP_VIEWS_QUERY, { id });

  await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit();

  //here if we don't use unstable_after from next-server views won't we be updated automatically as of now i haven't used it.

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalViews} </span>
      </p>
    </div>
  );
};

export default View;
