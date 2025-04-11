// import { useUserContext } from "@/context/AuthContext";
// import { deleteSavedPitch, likePitch, savePitch } from "@/lib/appwrite/api";
import {
  useDeleteSavedPitch,
  useGetCurrentUser,
  useLikePitch,
  useSavePitch,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
// import { useLocation } from "react-router-dom";
type PitchStatsProps = {
  pitch: Models.Document;
  userId: string;
};

const PitchStats = ({ pitch, userId }: PitchStatsProps) => {
  //   const location = useLocation();
  const likesList = pitch.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePitch } = useLikePitch();
  const { mutate: savePitch, isPending: isSavingPitch } = useSavePitch();
  const { mutate: deleteSavedPitch, isPending: isDeletingSaved } =
    useDeleteSavedPitch();

  const { data: currentUser } = useGetCurrentUser();

  const savedPitchRecord = currentUser?.save.find(
    (record: Models.Document) => record.pitch.$id === pitch.$id
  );

  useEffect(() => {
    setIsSaved(!savedPitchRecord);
  }, [savedPitchRecord, currentUser]);

  const handleLikePitch = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((Id) => Id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePitch({ pitchId: pitch.$id, likesArray: newLikes });
  };

  const handleSavePitch = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPitchRecord) {
      setIsSaved(false);
      return deleteSavedPitch(savedPitchRecord.$id);
    }

    savePitch({ userId: userId, pitchId: pitch.$id });
    setIsSaved(true);
  };

  //   const containerStyles = location.pathname.startsWith("/profile")
  //     ? "w-full"
  //     : "";

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/public/assets/icons/liked.svg"
              : "/public/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePitch}
          className="cursor-pointer"
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2 ">
        {isSavingPitch || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={`${
              isSaved
                ? "/public/assets/icons/saved.svg"
                : "/public/assets/icons/save.svg"
            }`}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePitch}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PitchStats;
