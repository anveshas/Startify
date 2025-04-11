import Loader from "@/components/shared/Loader";
import PitchCard from "@/components/shared/PitchCard";
import { useGetRecentPitches } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: pitches, isPending: isPitchLoading } = useGetRecentPitches();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPitchLoading && !pitches ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {pitches?.documents.map((pitch: Models.Document) => (
                <PitchCard pitch={pitch} key={pitch.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
