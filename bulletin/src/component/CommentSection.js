import React, { useState, useRef } from "react";
import styles from "./BoardDetail.module.css"

export default function CommentSection({ comments }) {
  const [commentList, setCommentList] = useState(comments);
  const commentContent = useRef(null);
  const [toggleComment, setToggleComment] = useState("on");

//   console.log(commentList);

  let commentsRows = null;
  if (commentList) {
      commentsRows = commentList.map((commentList) =>
          <tr key={commentList.no}>
              <td>{commentList.no}</td>
              <td>{commentList.contents}</td>
              <td><button value={commentList.no} onClick={()=>handleDeleteComment(commentList.no)}> 댓글 삭제 </button></td>
          </tr>
      )
  }

  function handleDeleteComment(commentNo) {
    let password = prompt("삭제를 위해서는 비밀번호를 입력해야 합니다.");
    // if (password === comments[Number(event.target.value)].pw) {
    //   let newComments = comments.filter((one) => one.no !== Number(event.target.value));
    if (password === "1234") {
      const newComments = commentList.filter(
        (commentList) => commentList.no !== commentNo
      );
      setCommentList(newComments);
    }
  }

  function handleAddComment(event) {
    event.preventDefault();
    const newComment = {
      no: Number(commentList[comments.length - 1].no) + 1,
      contents: commentContent.current.value,
      pw: 1234,
    };
    commentContent.current.value = "";
    setCommentList([...commentList, newComment]);
  }


  function toggleComments(event) {
    const updatedValue = event.target.value;
    setToggleComment(updatedValue);
  }


  


  return (
    <>
      <table className={ toggleComment==="on" ? styles.comment : styles.commentInvisible}>
        <thead>
          <tr>
            <th>댓글 번호</th>
            <th>댓글 내용</th>
          </tr>
        </thead>
        <tbody>{commentsRows}</tbody>
      </table>
    

      <div>
        <form action="/" onSubmit={handleAddComment}>
          <input type="submit" value="댓글등록"></input>
          <br />
          <textarea cols="95" rows="5" ref={commentContent}></textarea>
        </form>

        댓글보이기<input type="radio" name="toggleComment" value="on" checked={toggleComment==="on"}  onChange={(event) => { toggleComments(event); console.log(toggleComment); }}></input>
        댓글감추기 <input type="radio" name="toggleComment" value="off" checked={toggleComment==="off"} onChange={toggleComments}></input>
        <input type="text" name="pw" value="패스워드를 입력하세요"></input>
       </div>

      

        
    
    </>
  );
}
