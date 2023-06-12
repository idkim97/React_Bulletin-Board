import React, { useState, useRef, useEffect } from "react";
import styles from "./BoardDetail.module.css"
import { useParams } from "react-router-dom";
import { homeDomain, dataDomain } from "./domain";

export default function CommentSection({ comments }) {

  const [commentList, setCommentList] = useState([]);
  const commentContent = useRef(null);
  const [toggleComment, setToggleComment] = useState("on");


  useEffect(()=>{
    setCommentList(comments);
  },[comments])

  let commentsRows = null;
  if (commentList) {
      commentsRows = Array.from(commentList).map((commentList) =>
          <tr key={commentList.no}>
              <td>{commentList.no}</td>
              <td>{commentList.contents}</td>
              <td><button value={commentList.no} onClick={()=>handleDeleteComment(commentList.no)}> 댓글 삭제 </button></td>
          </tr>
      )
  }

  const {id} = useParams();
  
  function handleDeleteComment(commentNo) {
    const password = prompt("비밀번호를 입력하세요.");
    if(password){
        const requestOptions = {
            method : "DELETE",
        };
        console.log(`${dataDomain}/bulletinBoard/${id}/comments/${commentNo}`);
        fetch(`${dataDomain}/bulletinBoard/${id}/comments/${commentNo}`,requestOptions)
        //.then(res=>res.json())
        .then(res=>res.json())
        .then(data => {
            console.log(data.success);
            // if(data.success){
                const newComments = commentList.filter((comment) => comment.no !== commentNo);
                setCommentList(newComments);
            //   } else {
            //     alert("댓글 삭제에 실패했습니다.");
            //   }
            }
        )
        .catch(error=>{
            console.error("댓글 삭제 오류 :",error);
        })
    }
  }

  function handleAddComment(event) {
    event.preventDefault();
    const newComment = {
      no: Number(commentList[comments.length - 1].no) + 1,
      contents: commentContent.current.value,
      pw: 1234,
    };
    debugger
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

        댓글보이기<input type="radio" name="toggleComment" value="on" checked={toggleComment==="on"}  onChange={toggleComments}></input>
        댓글감추기 <input type="radio" name="toggleComment" value="off" checked={toggleComment==="off"} onChange={toggleComments}></input>
        <input type="text" name="pw" value="패스워드를 입력하세요"></input>
       </div>

      

        
    
    </>
  );
}
