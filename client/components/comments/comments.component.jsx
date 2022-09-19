import React, { useState, useEffect } from 'react';
import styles from './Comments.module.scss';
import Comment from '../comment/comment.component';
import { AiOutlineSend } from 'react-icons/ai';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import axios from 'axios';
const Comments = ({
  productOwnerName,
  product,
  currentUser = { currentUser },
  comments,
}) => {
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsData, setCommentsData] = useState(comments);
  const isLoggedIn = currentUser && currentUser !== null;
  const { doRequest, errors } = useRequest({
    url: `/api/products/${product.id}/comments/create`,
    body: {
      comment,
    },
    method: 'post',
    onSuccess: () => setCommentsLoading(false),
  });
  const handleSubmit = () => {};
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const fetchComments = async () => {
    const { data: commentsResponse } = await axios.get(
      `/api/products/${product.id}/comments`
    );
    setCommentsData(commentsResponse.comments);
  };
  const handlePostComment = () => {
    if (!isLoggedIn) {
      Router.push('/auth');
      return;
    }
    doRequest();
    setCommentsLoading(true);
  };
  useEffect(() => {
    fetchComments();
  }, [commentsLoading]);
  return (
    <div className={styles.comments_container}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.comment_input}
          type="text"
          required
          defaultValue={comment}
          minLength="5"
          placeholder="Add a comment...."
          onChange={handleChange}
        />
        <button
          onClick={() => {
            handlePostComment();
          }}
          className={styles.send_button}
        >
          <AiOutlineSend size={18} />
        </button>
      </form>
      <div className="erros">{errors}</div>
      <div>
        {commentsData &&
          commentsData.map((comment) => (
            <Comment
              product={product}
              key={comment.id}
              commentDetails={comment}
              productOwnerName={productOwnerName}
              currentUser={currentUser}
              setCommentsLoading={setCommentsLoading}
            />
          ))}
      </div>
    </div>
  );
};

export default Comments;
