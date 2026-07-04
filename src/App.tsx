import { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";

import { usePosts, useComments } from "./hooks";
import type { Post, PostComment } from "./types";

import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";
import CommentCard from "./components/CommentCard";
import CommentForm from "./components/CommentForm";

function App() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const [postList, setPostList] = useState<Post[]>([]);
  const [openPostForm, setOpenPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [commentList, setCommentList] = useState<PostComment[]>([]);
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [editingComment, setEditingComment] = useState<PostComment | null>(null);

  const { data: posts = [], isLoading, error } = usePosts();
  const { data: comments = [] } = useComments(selectedPost);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  const handleSavePost = (post: Post) => {
    const exists = postList.find((p) => p.id === post.id);
    if (exists) {
      setPostList(postList.map((p) => (p.id === post.id ? post : p)));
    } else {
      setPostList([post, ...postList]);
    }
    setEditingPost(null);
    setOpenPostForm(false);
  };

  const handleSaveComment = (comment: PostComment) => {
    const exists = commentList.find((c) => c.id === comment.id);
    if (exists) {
      setCommentList(commentList.map((c) => (c.id === comment.id ? comment : c)));
    } else {
      setCommentList([comment, ...commentList]);
    }
    setEditingComment(null);
    setOpenCommentForm(false);
  };

  const handleDeleteComment = (id: number) => {
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography align="center" color="error" sx={{ mt: 5 }}>
        Error loading posts.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f5f7ff 0%, #eef1f8 100%)",
        pb: 6,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pt: 5, mb: 4 }}>
        <Box
          sx={{
            background: "linear-gradient(90deg, #8889df, #3b2867)",
            py: 1.5,
            px: 8,
            borderRadius: 4,
          }}
        >
          <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700 }}>
            Posts
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #8889df, #3b2867)",
              borderRadius: 2,
              px: 3,
              "&:hover": {
                background: "linear-gradient(90deg, #292488, #a887e0)",
              },
            }}
            onClick={() => {
              setEditingPost(null);
              setOpenPostForm(true);
            }}
          >
            Create Post
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {postList.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => setSelectedPost(post.id)}
              onEdit={() => {
                setEditingPost(post);
                setOpenPostForm(true);
              }}
            />
          ))}
        </Box>
      </Container>

      <Dialog
        open={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        fullWidth
        maxWidth="md"
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #8889df, #3b2867)",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Comments
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: 180,
                background: "linear-gradient(90deg, #8889df, #3b2867)",
              }}
              onClick={() => {
                setEditingComment(null);
                setOpenCommentForm(true);
              }}
            >
              Create Comment
            </Button>

            <Button
              variant="outlined"
              sx={{ width: 180 }}
              onClick={() => setSelectedPost(null)}
            >
              Close
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {commentList.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onEdit={() => {
                  setEditingComment(comment);
                  setOpenCommentForm(true);
                }}
                onDelete={() => handleDeleteComment(comment.id)}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      <PostForm
        open={openPostForm}
        onClose={() => {
          setOpenPostForm(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
        selectedPost={editingPost}
      />

      <CommentForm
        open={openCommentForm}
        onClose={() => {
          setOpenCommentForm(false);
          setEditingComment(null);
        }}
        onSave={handleSaveComment}
        selectedComment={editingComment}
      />
    </Box>
  );
}

export default App;