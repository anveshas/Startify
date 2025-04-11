import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPitch,
  createUserAccount,
  deleteSavedPitch,
  getCurrentUser,
  getRecentPitches,
  getUserById,
  getPitchById,
  getUsers,
  likePitch,
  savePitch,
  signInAccount,
  signOutAccount,
} from "../appwrite/api";
import {
  INewPitch,
  INewUser,
} from "/Users/adarshamit1001/Startify/src/types/index";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreatePitch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (pitch: INewPitch) => createPitch(pitch),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PITCHES],
      });
    },
  });
};
export const useGetRecentPitches = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_PITCHES],
    queryFn: getRecentPitches,
  });
};
export const useLikePitch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      pitchId,
      likesArray,
    }: {
      pitchId: string;
      likesArray: string[];
    }) => likePitch(pitchId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PITCH_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PITCHES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PITCHES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useSavePitch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, pitchId }: { userId: string; pitchId: string }) =>
      savePitch(pitchId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PITCHES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PITCHES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useDeleteSavedPitch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (savedRecordId: string) => deleteSavedPitch(savedRecordId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_PITCHES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PITCHES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};
export const useGetPitchById = (pitchId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PITCH_BY_ID, pitchId],
    queryFn: () => getPitchById(pitchId),
    enabled: !!pitchId,
  });
};
