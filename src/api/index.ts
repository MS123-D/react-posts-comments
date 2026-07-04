import type { Post, PostComment } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// ---------------- POSTS ----------------

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
};

export const createPost = async (
  post: Omit<Post, "id">
): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return response.json();
};

export const updatePost = async (
  post: Post
): Promise<Post> => {
  const response = await fetch(
    `${BASE_URL}/posts/${post.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }
  );

  return response.json();
};

// ---------------- COMMENTS ----------------

export const fetchComments = async (
  postId: number
): Promise<PostComment[]> => {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/comments`
  );

  return response.json();
};

export const createComment = async (
  comment: Omit<PostComment, "id">
): Promise<PostComment> => {
  const response = await fetch(
    `${BASE_URL}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }
  );

  return response.json();
};

export const updateComment = async (
  comment: PostComment
): Promise<PostComment> => {
  const response = await fetch(
    `${BASE_URL}/comments/${comment.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }
  );

  return response.json();
};

export const deleteComment = async (
  id: number
) => {
  await fetch(
    `${BASE_URL}/comments/${id}`,
    {
      method: "DELETE",
    }
  );
};