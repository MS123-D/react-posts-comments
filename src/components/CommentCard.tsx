import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { PostComment } from "../types";

interface CommentCardProps {
  comment: PostComment;
  onEdit: () => void;
  onDelete: () => void;
}

function CommentCard({
  comment,
  onEdit,
  onDelete,
}: CommentCardProps) {
  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: "4px solid #3b2867",
        borderRadius: 2,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#3b2867" }}>
            {comment.name}
          </Typography>

          <Box>
            <IconButton onClick={onEdit} size="small" sx={{ color: "#3b2867" }}>
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton onClick={onDelete} size="small" sx={{ color: "#ef4444" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {comment.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;