// import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./BoardDetail.module.css"
import CommentSection from "./CommentSection";


export default function BoardDetail() {
    const location = useLocation();
    const item = location.state ? location.state.item : null;
    const [comments, setComments] = useState(item.comments);

    

    if (!item) {
        return <div>오류: 게시물이 없습니다.</div>;
    }




   
    return (
      <div>
        {/* 제목부분 */}
        <Header title={item.title}></Header>
        {/* 내용 부분 */}
        <Content content={item.contents}></Content>
        {/* 댓글 섹션 */}
        <CommentSection comments={comments} />
      </div>
    );
}


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

