import { useQuery } from "@tanstack/react-query";
import { fetchPosts, fetchComments } from "../api";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};

export const useComments = (postId: number | null) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId!),
    enabled: postId !== null,
  });
};