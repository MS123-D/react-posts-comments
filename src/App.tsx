import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
} from "@mui/material";

import { usePosts, useComments } from "./hooks";

function App() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const {
    data: posts = [],
    isLoading,
    error,
  } = usePosts();

  const {
    data: comments = [],
  } = useComments(selectedPost);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error Loading Posts</Typography>;
  }

  return (
    <>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
      >
        Posts
      </Typography>

      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            margin: 2,
            cursor: "pointer",
          }}
          onClick={() => setSelectedPost(post.id)}
        >
          <CardContent>
            <Typography variant="h6">
              {post.title}
            </Typography>

            <Typography variant="body2">
              {post.body}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Dialog
        open={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Comments
        </DialogTitle>

        <DialogContent>
          {comments.map((comment) => (
            <Card key={comment.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">
                  {comment.name}
                </Typography>

                <Typography variant="body2">
                  {comment.body}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Button
            variant="contained"
            onClick={() => setSelectedPost(null)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;