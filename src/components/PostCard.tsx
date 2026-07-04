import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Post } from "../types";

interface PostCardProps {
  post: Post;
  onClick: () => void;
  onEdit: () => void;
}

function PostCard({
  post,
  onClick,
  onEdit,
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
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#3b2867" }}>
            {post.title}
          </Typography>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            size="small"
            sx={{ color: "#3b2867" }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PostCard;