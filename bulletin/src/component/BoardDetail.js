import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BoardDetail.module.css"
import CommentSection from "./CommentSection";
import { homeDomain, dataDomain } from "./domain";


function Header({title}){
    return(
        <>
        <h5>{title}</h5>
        <hr />
        </>
    )
}

function Content({content}){
    return(
        <>
            <p>{content}</p>
            <hr/>
        </>
    )
}


export default function BoardDetail() {
    const [board ,setBoard] = useState({
        "id" : 0,
        "title" : null,
        "contents" : null, 
        "name" : null, 
        "date" : null, 
        "comments" : {
            "no" : null,
            "name" : null,
            "contents" : null,
            "pw" : 0
        } 
    });

    const {id} = useParams();

    useEffect(()=>{
        console.log(id);
        fetch(`${dataDomain}/bulletinBoard/${id}`)
        .then(res=>{return res.json()})
        .then(data=>{
            setBoard(data);
        });
    },[id]);

    if (!board) {
        return <div>오류: 게시물이 없습니다.</div>;
    }


    return (
      <div>
        {/* 제목부분 */}
        <Header title={board.title}></Header>
        {/* 내용 부분 */}
        <Content content={board.contents}></Content>
        {/* 댓글 섹션 */}
        <CommentSection comments={board.comments}/>
      </div>
    );
}




