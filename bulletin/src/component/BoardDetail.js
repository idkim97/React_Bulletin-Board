import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BoardList.module.css"
import CommentSection from "./CommentSection";
import { homeDomain, dataDomain } from "./domain";
import axios from "axios";



function Header({title , view , onViewUpdate}){
    return(
        <>
        <h5 onClick={onViewUpdate}>{title}</h5>
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

function Table({title , date , contents}){
    return (
        <table border="1" >
            <tr>
                <td>제목</td>
                <td>{title}</td>
                <td>작성일자</td>
                <td>{date}</td>
            </tr>
            <tr rowspan="3">
                <td>{contents}</td>
                <td>ㅋㅋ</td>
            </tr> 
        </table>
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

    const handleViewUpdate = async () => {
        try{
            const updatedView = {
                ...board,
                view : board.view+1,
            };

            await axios.patch(`${dataDomain}/bulletinBoard/${id}`, updatedView);
            
            setBoard(updatedView);
            console.log(board.view);
        }catch(error){
            console.log("Error updating view",error);
        }
    }


    return (
      <div>

        <Table title={board.title} date={board.date} contents={board.contents} ></Table>
        {/* 댓글 섹션 */}
        <CommentSection comments={board.comments}/>

      </div>
    );
}




