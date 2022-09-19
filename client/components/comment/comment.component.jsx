import React, { useState } from 'react';
import styles from './Comment.module.scss';
import { FiTrash, FiEdit, FiCornerDownLeft } from 'react-icons/fi';
import { AiOutlineSend } from 'react-icons/ai';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const Comment = ({
  product,
  commentDetails,
  currentUser,
  productOwnerName,
  setCommentsLoading,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { id, commentorName, commentorId, reply, comment } = commentDetails;
  const [commentText, setCommentText] = useState(comment);
  const [replyText, setReplyText] = useState(reply);
  const productOwner = currentUser && currentUser.id === product.userId;
  const commentor = currentUser && currentUser.id === commentorId;
  console.log('show reply form', showReplyForm);

  const { doRequest: commentEditRequest, errors: commentEditErrors } =
    useRequest({
      url: `/api/products/${product.id}/comments/${id}/edit`,
      body: {
        comment: commentText,
        reply: replyText,
      },
      method: 'post',
      onSuccess: () =>
        setCommentsLoading((commentsLoading) => !commentsLoading),
    });
  const { doRequest: commentDeleteRequest, errors: commentDeleteErrors } =
    useRequest({
      url: `/api/products/${product.id}/comments/${id}`,
      body: {},
      method: 'post',
      onSuccess: () =>
        setCommentsLoading((commentsLoading) => !commentsLoading),
    });

  return (
    <div className={styles.comment_container}>
      <div className={styles.commentor_container}>
        <div className={styles.nameandicons}>
          <p className={styles.commentor_name}>{commentorName}</p>
          {commentor && (
            <div>
              <FiEdit onClick={() => setShowCommentForm(!showCommentForm)} />
              <FiTrash onClick={() => commentDeleteRequest()} />
            </div>
          )}
        </div>
        {showCommentForm && (
          <form className={styles.commentor_form}>
            <input
              className={styles.commentor_input}
              defaultValue={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              onClick={() => commentEditRequest()}
              className={styles.comment_send_button}
            >
              <AiOutlineSend size={15} />
            </button>
          </form>
        )}
        {!showCommentForm && <p className={styles.comment}>{comment}</p>}
      </div>
      <div className={styles.replier_container}>
        {!reply && productOwner && (
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            style={{
              marginLeft: '20px',
              border: 'none',
              background: 'none',
            }}
          >
            <FiCornerDownLeft size={15} />
          </button>
        )}
        <div>
          {reply && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <p className={styles.replier_name}>
                {productOwnerName}
                <span> (owner)</span>
              </p>
              {productOwner && (
                <div className={styles.icons}>
                  <FiEdit onClick={() => setShowReplyForm(!showReplyForm)} />
                  <FiTrash onClick={() => commentDeleteRequest()} />
                </div>
              )}
            </div>
          )}
        </div>
        {showReplyForm && productOwner && (
          <form className={styles.reply_form}>
            <input
              type="text"
              placeholder="send reply"
              onChange={(event) => setReplyText(event.target.value)}
              className={styles.reply_input}
              defaultValue={replyText}
            />
            <button
              onClick={() => commentEditRequest()}
              className={styles.reply_send_button}
            >
              <AiOutlineSend size={15} />
            </button>
          </form>
        )}
        {!showReplyForm && reply && <p className={styles.reply}>{reply}</p>}
      </div>
    </div>
  );
};

export default Comment;
