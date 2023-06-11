// import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./BoardDetail.module.css"


export default function BoardDetail() {
    const location = useLocation();
    const item = location.state ? location.state.item : null;
    const [comments, setComments] = useState(item.comments);
    const [toggleComment, setToggleComment] = useState("on");
    let commentContent = useRef(null);


    function deleteComment(event) {
        let password = prompt("삭제를 위해서는 비밀번호를 입력해야 합니다.");
        // if (password === comments[Number(event.target.value)].pw) {
        //   let newComments = comments.filter((one) => one.no !== Number(event.target.value));
        if (password === "1234") {
            let commentNo = event.target.value;
            let newComments = comments.filter((one) => one.no !== commentNo);
            setComments(newComments);
            console.log(newComments);
        }
    }

    function addComment(event){
        event.preventDefault();
        let newone = { no : Number(comments[comments.length-1].no)+1, contents: commentContent.current.value, pw:1234}
        commentContent.current.value = null ;
        let newComments = [ ...comments, newone];
        setComments(newComments);
    }

    function toggleComments(event){
        console.log(event.target.value);
        setToggleComment(event.target.value);
    }




    if (!item) {
        return <div>오류: 게시물이 없습니다.</div>;
    }


    let commentsRows = null;
    if (comments) {
        commentsRows = comments.map((comments) =>
            <tr key={comments.no}>
                <td>{comments.no}</td>
                <td>{comments.contents}</td>
                <td><button value={comments.no} onClick={deleteComment}> 댓글 삭제 </button></td>
            </tr>
        )
    }

    return (
        <div>
            <h5>{item.title}</h5>
            <hr />
            <p>{item.contents}</p>
            <hr />


            <table className={(toggleComment==="on") ?  styles.comment:styles.commentInVisible}>
                <thead>
                    <tr>
                        <th>댓글 번호</th>
                        <th>댓글 내용</th>
                    </tr>
                </thead>
                <tbody>
                    {commentsRows}
                </tbody>
            </table>

            댓글보이기<input type="radio" name="toggleComment" value="on" onClick={toggleComments}></input>
            댓글감추기<input type="radio" name="toggleComment" value="off" onClick={toggleComments}></input>
         

            <div className>
                <form action="/" onSubmit={addComment}>
                    <input type="submit" value="댓글등록" ></input><br />
                    <textarea cols="95" rows="5" ref={commentContent}></textarea>
                </form>
            </div>

        </div>
    );
}

