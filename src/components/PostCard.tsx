import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function PostCard({
  post,
  onClick,
  onEdit,
  onDelete,
}: PostCardProps) {
  return (
    <Card
      sx={{
        mb: 2,
        cursor: "pointer",
        borderLeft: "4px solid #3b2867",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 14px rgba(99,102,241,0.18)",
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left Side */}
          <Box sx={{ flex: 1, mr: 2 }}>
            <Typography variant="h6">
              {post.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{ mt: 1 }}
            >
              {post.body}
            </Typography>
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
            }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <DeleteIcon
                fontSize="small"
                color="error"
              />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;