import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import type { Post } from "../types";

interface PostFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (post: Post) => void;
  selectedPost?: Post | null;
}

function PostForm({
  open,
  onClose,
  onSave,
  selectedPost,
}: PostFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [selectedPost]);

  const handleSave = () => {
    onSave({
      id: selectedPost?.id ?? Date.now(),
      title,
      body,
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {selectedPost ? "Edit Post" : "Create Post"}
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} sx={{ mt: 2 }}>

          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Body"
            multiline
            rows={4}
            fullWidth
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>

        </Stack>

      </DialogContent>
    </Dialog>
  );
}

export default PostForm;