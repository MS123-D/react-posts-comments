import type { Post, PostComment } from "../types";

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return response.json();
};

export const fetchComments = async (
  postId: number
): Promise<PostComment[]> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );

  return response.json();
};