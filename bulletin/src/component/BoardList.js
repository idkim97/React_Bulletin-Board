import { Link } from "react-router-dom";
import imgLogo from './img/logo.png'
import styles from "./BoardList.module.css";
import { dataDomain } from "./domain";
import { useEffect, useState } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export default function BoardList() {


    const [list,setList] = useState([]);

    const info = list.map(board=>(
        <tr key={board.id} >
            <td>{board.id}</td>
            <td><Link to={'/detail/' + board.id} state={{ item: board }} className={styles.tr}> {board.title}</Link></td>
            <td>{board.name}</td>
            <td>{board.date}</td>
            <td>{board.view}</td>
        </tr>
    ))

    // json서버에서 json데이터 받아온다
    useEffect(()=>{
        fetch(`${dataDomain}/bulletinBoard`)
        .then(res=>{return res.json()})
        .then(data=>{setList(data)}
        );
    },[]);

    return (
        <div>
            <Header></Header>
            <Board info={info}></Board>
        </div>

    )
}


// 헤더 부분
function Header() {
    return (
        <header>
            <div class="logo" className={styles.title}>
                <img src={imgLogo}></img>
                <span class="title" className={styles.logoTitle}>카카오 클라우드 스쿨</span>
            </div>
        </header>

    )
}

function Board({info}) {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>{info}</tbody>
            </Table>

            
        </>
    )
}