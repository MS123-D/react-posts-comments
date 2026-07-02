import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
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

function App() {
  // const [posts, setPosts] = useState([]);
  // const [comments, setComments] = useState([]);
  // const [dialogBox, setDialogBox] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data));
  // }, []);

  const { data: posts = [],
    isLoading,
    error,
   } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      return response.json();
    },
   });

  // const getComments = async (postId) => {
  //   const response = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  //   );

  //   const data = await response.json();
  //   setComments(data);
  //   setDialogBox(true);
  // };
  
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", selectedPost], queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${selectedPost}/comments`);
      return response.json();
    },
    enabled: !!selectedPost,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <h2>Error loading posts.</h2>;
  }
  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>Posts</Typography>

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
            <Typography variant="h6">{post.title}</Typography>

            <Typography variant="body2">{post.body}</Typography>
          </CardContent>
        </Card>  
      ))}

      <Dialog open={selectedPost !== null} onclose={() => setSelectedPost(null)} maxWidth='sm' fullWidth 
      >
        <DialogTitle>Comments</DialogTitle>

        <DialogContent>
          {comments.map((comment) => (
            <Card key={comment.id} sx={{marginBottom: 2}}>
              <CardContent>
                <Typography variant="subtitle1">{comment.name}</Typography>
                <Typography variant="body2">{comment.body}</Typography>
              </CardContent>
            </Card>
          ))}
          <Button variant="contained" onClick={() => setSelectedPost(null)}>Close</Button>
        </DialogContent>  
      </Dialog>      
    </>
  );
}

export default App;