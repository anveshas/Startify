import { useUserContext } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";

type PitchCardProps = {
  pitch: Models.Document;
};
const InvestorCard = ({ pitch }: PitchCardProps) => {
  const { user } = useUserContext();
  // const { id } = useParams();
  //const { isPending } = useGetPitchById(id || "");
  if (!pitch.creator) return;
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${pitch.creator.$id}`}>
            <img
              src={
                pitch?.creator?.imageUrl ||
                "/public/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p>{pitch.creator.name}</p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {formatDate(pitch.$createdAt)}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {pitch.Location}
              </p>
            </div>
          </div>
        </div>
        <Link
          to={`/update-pitch/${pitch.$id}`}
          className={`${user.id !== pitch.creator.$id && "hidden"}`}
        >
          <img
            src="/public/assets/icons/edit.svg"
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <Link to={`/pitch/${pitch.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{pitch.caption}</p>
          <ul>
            {pitch.type.map((type: string) => (
              <li key={type} className="text-light-3">
                #{type}
              </li>
            ))}
          </ul>
        </div>
        {
          // Video element replacing the image
          <video
            src={
              "public/assets/images/WhatsApp Video 2024-04-21 at 12.16.51 PM (1) (1).mp4"
            }
            className="post-card_video"
            controls
            width="600" // Specified width for video
            height="340" // Specified height for video
            poster="https://t4.ftcdn.net/jpg/03/22/82/19/240_F_322821903_AKplDFbaUeYzf6sJpl93O1e3KEXUKStK.jpg" // Poster if video is not yet loaded
          />
        }
      </Link>
    </div>
  );
};

export default InvestorCard;
