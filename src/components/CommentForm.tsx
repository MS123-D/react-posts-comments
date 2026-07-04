import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import type { PostComment } from "../types";

interface CommentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (comment: PostComment) => void;
  selectedComment?: PostComment | null;
}

function CommentForm({
  open,
  onClose,
  onSave,
  selectedComment,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (selectedComment) {
      setName(selectedComment.name);
      setBody(selectedComment.body);
    } else {
      setName("");
      setBody("");
    }
  }, [selectedComment]);

  const handleSave = () => {
    onSave({
      id: selectedComment?.id ?? Date.now(),
      postId: selectedComment?.postId,
      name,
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
        {selectedComment ? "Edit Comment" : "Create Comment"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: "linear-gradient(90deg, #8889df, #3b2867)",
              "&:hover": {
                background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
              },
            }}
          >
            Save
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default CommentForm;