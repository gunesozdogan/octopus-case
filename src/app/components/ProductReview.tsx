import { useEffect, useState } from "react";
import starIcon from "../Icons/star.png";

interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    username: string;
  };
}

interface CommentsProps {
  productId: number;
}

export const ProductReviews: React.FC<CommentsProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/comments/post/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch comments:", err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div>No comments yet.</div>;
  }

  const commentsToDisplay = showAll ? comments : comments.slice(0, 2);

  return (
    <div className="mt-[56px]">
      <h2 className="font-bold font-poppins text-[16px] mb-[16px]">
        Ürün Yorumları
      </h2>
      <ul className="flex flex-col gap-[24px]">
        {commentsToDisplay.map((comment) => (
          <li key={comment.id}>
            <div className="flex items-center gap-[16px]">
              <p className="text-[18px] text-[#000] font-semibold">
                {comment.user.username}
              </p>
              <img src={starIcon.src} alt="stars" className="h-[12px]" />
            </div>

            <p className="text-[18px] text-[#000]">{comment.body}</p>
          </li>
        ))}
      </ul>
      {comments.length > 2 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="h-[44px] w-[131px] bg-[#1E293B] text-white mt-[16px] rounded-lg py-[10px] px-[24px] text-[14px]"
        >
          {showAll ? "Küçült" : "Tümünü Gör"}
        </button>
      )}
    </div>
  );
};
