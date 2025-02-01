import { memo, useState, useCallback } from "react";
import { ADD_COMMENT, TOGGLE_COMMENTS } from "../constants";
import "./comments.css";

const Comment = memo(function Comment({ comment }) {
    const { text, author, createdAt } = comment;
    const formattedDate = new Date(createdAt).toLocaleString();
    
    return (
        <div className="comment">
            <div className="comment-header">
                <span className="comment-author">{author}</span>
                <span className="comment-date">{formattedDate}</span>
            </div>
            <div className="comment-text">{text}</div>
        </div>
    );
});

export const Comments = memo(function Comments({ todo, dispatch }) {
    const [newComment, setNewComment] = useState("");
    const { id, comments, showComments, assignedTo } = todo;

    const handleAddComment = useCallback((e) => {
        e.preventDefault();
        if (newComment.trim()) {
            dispatch({
                type: ADD_COMMENT,
                payload: {
                    id,
                    text: newComment.trim(),
                    author: assignedTo
                }
            });
            setNewComment("");
        }
    }, [dispatch, id, newComment, assignedTo]);

    const toggleComments = useCallback(() => {
        dispatch({
            type: TOGGLE_COMMENTS,
            payload: { id }
        });
    }, [dispatch, id]);

    return (
        <div className="comments-section">
            <button 
                className="toggle-comments-btn"
                onClick={toggleComments}
            >
                {showComments ? "Hide Comments" : `Show Comments (${comments.length})`}
            </button>
            
            {showComments && (
                <div className="comments-container">
                    {comments.map(comment => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                    
                    <form onSubmit={handleAddComment} className="comment-form">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="comment-input"
                        />
                        <button 
                            type="submit"
                            className="add-comment-btn"
                            disabled={!newComment.trim() || assignedTo === "Unassigned"}
                        >
                            Add Comment
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
});