import boardList from "../db/data.json";
import { Link } from "react-router-dom";

export default function BoardList() {

    const list = boardList.bulletinBoard.map(board => (
        <tr key={board.id}>
            <td>{board.id}</td>
            <td><Link to={'/detail/' + board.id} state={{ item: board }}> {board.title}</Link></td>
            <td>{board.name}</td>
            <td>{board.date}</td>
            <td>{board.view}</td>
        </tr>
    ))

    return (
        <div>
            <Header></Header>
            <Board list={list}></Board>
        </div>

    )
}


// 헤더 부분
function Header() {
    return (
        <header>
            <div class="logo">
                <img src="./component/img/logo.png"></img>
                <span class="title">카카오 클라우드 스쿨</span>
            </div>
        </header>

    )
}

function Board({list}) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>{list}</tbody>
            </table>

            <button className="enrollBtn"> 등록 </button>
        </>
    )
}