import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import { homeDomain, dataDomain } from "./domain";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import styles from "./BoardDetail.module.css";


function Detail({title , date , contents}){
    return (
        <Table className={`${styles.detail} ${styles.centered}`} striped bordered hover>
            <tr>
                <td>제목</td>
                <td>{title}</td>
                <td>작성일자</td>
                <td>{date}</td>
            </tr>
            <tr>
                <td>내용</td>
                <td colSpan="3">{contents}</td>
            </tr> 
        </Table>
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
        },
        "view" : 0
    });

    const {id} = useParams();

    useEffect(()=>{
        fetch(`${dataDomain}/bulletinBoard/${id}`)
        .then(res=>{return res.json()})
        .then(data=>{
            setBoard(data);
        })
        .then(console.log(board));
    },[id]);

    if (!board) {
        return <div>오류: 게시물이 없습니다.</div>;
    }

    


    return (
      <div>
        {/* 제목, 내용 */}
        <Detail title={board.title} date={board.date} contents={board.contents} ></Detail>

        {/* 댓글 섹션 */}
        <CommentSection comments={board.comments}/>

      </div>
    );
}




