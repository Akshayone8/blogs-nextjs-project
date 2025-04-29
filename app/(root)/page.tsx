import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const params = { search: query || null };
  // you can think why we have writeen query in key value pair insted we could have writeen it directly Because when calling sanityFetch({ query: STARTUPS_QUERY, params }),
  //  the params need to be passed as an object where the keys match the variables used inside the Sanity query.

  // const posts = await client.fetch(STARTUPS_QUERY);//this is one method to fetch the data
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params }); // this is a new way to fetch the data this is faster compared to other one you can watch the video 2:49

  // here in the above params are like arguments from here go and check queries and check
  // const posts = [
  //   {
  //     _createsAt: "Yesterday",
  //     views: 55,
  //     author: { _id: 1, name: "AssGaurd" },
  //     _id: 1,
  //     descrption: "This is A Discrption",
  //     image:
  //       "https://unsplash.com/photos/a-toy-of-a-person-with-a-helmet-on-PssUpGQzVaA",
  //     category: "Robots",
  //     title: "No More Robots",
  //   },
  // ];
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virutal
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for ${query}` : "All Startups"}
        </p>
        <ul className="my-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
      <SanityLive />
      {/* //by importing this content will be shown immediately
      whenever there is a new data gets added */}
    </>
  );
};

export default Home;
