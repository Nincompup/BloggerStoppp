import React, { useState, useRef } from 'react';
import { Typography, TextField, Button, Divider, CardActions } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';
import { likeComment, deleteComment } from '../../actions/posts';



const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [commentdata, setCommentdata] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const userId = user?.result.googleId || user?.result?._id;


  const handleComment = async () => {
    const newComments = await dispatch(commentPost({ comment: `${user?.result?.name}: ${commentdata}`, commentlikes: [] }, post._id));
    setCommentdata('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({behaviour:'smooth'});
  };


  return (
    <div>
      <div className={classes.commentsOuterContainer}>

      <div style={{ width: '100%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={commentdata}  onChange={(e) => setCommentdata(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth color="primary" variant="contained" onClick={handleComment} disabled={!commentdata.length}>
            Comment
          </Button>
          <Divider style={{ margin: '20px 0' }} />

        </div>
        <Typography gutterBottom variant="h6">Comments</Typography>

        <div className={classes.commentsInnerContainer}>
          {comments?.sort(function (a, b) {
            return b.commentlikes.length - a.commentlikes.length;}).map((c) =>
          (
            
          <>
            <Typography key={c._id} gutterBottom variant="subtitle1">
              <strong>{!c.comment ? null : c.comment.split(': ')[0]}: </strong>
              {!c.comment ? null : c.comment.split(':')[1]}
            </Typography>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary" disabled={!user?.result} onClick={async () => {
                setComments(await dispatch(likeComment(post._id, c._id)));

                const hasLikedComment = c.commentlikes.find((x) => x === userId);
                if (hasLikedComment) {
                  c.commentlikes = (c.commentlikes.filter((t) => t !== userId));
                } else {
                  c.commentlikes = ([...c.commentlikes, userId]);
                }

              }}>
                {c.commentlikes.length > 0 ? (c.commentlikes.find((like) => like === userId) ?
                  (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{c.commentlikes.length > 2 ? `You and ${c.commentlikes.length - 1} others` : `${c.commentlikes.length} like${c.commentlikes.length > 1 ? 's' : ''}`}</>
                  ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{c.commentlikes.length} {c.commentlikes.length === 1 ? 'Like' : 'Likes'}</>
                  )
                ) : <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>}
              </Button>
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="secondary" onClick={async () => {
                  setComments(await dispatch(deleteComment(c._id, post._id)));
                 
                }}>
                  <DeleteIcon fontSize="small" /> &nbsp; Delete
                </Button>

              )}
            </CardActions>
            <Divider style={{ margin: '20px 0' }} />
          </>
          ))}
          <div ref={commentsRef} />
        </div>
        
      </div>
    </div>
  );
};

export default CommentSection;
