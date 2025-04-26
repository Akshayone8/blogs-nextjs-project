import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const posts = [
    {
      _createsAt: "Yesterday",
      views: 55,
      author: { _id: 1, name: "AssGaurd" },
      _id: 1,
      descrption: "This is A Discrption",
      image:
        "https://unsplash.com/photos/a-toy-of-a-person-with-a-helmet-on-PssUpGQzVaA",
      category: "Robots",
      title: "No More Robots",
    },
  ];
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
          {posts.length > 0 ? (
            posts?.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default Home;
