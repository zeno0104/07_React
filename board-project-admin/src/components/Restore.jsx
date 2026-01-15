import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Restore() {
  const [withdrawnMembers, setWithdrawnMembers] = useState(null); // 탈퇴 회원 목록을 담을 상태값

  // 삭제 게시글 목록
  const [deletedBoard, setDeletedBoard] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async () => {
    try {
      const resp = await axiosApi.get("/admin/withdrawnMemberList");

      if (resp.status === 200) {
        setWithdrawnMembers(resp.data);
      }
    } catch (error) {
      console.log("탈퇴 회원 목록 조회 중 에러 발생 : ", error);
    }
  };

  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async (member) => {
    if (confirm(`${member.memberNickname}님을 탈퇴 복구 시키시겠습니까?`)) {
      const resp = await axiosApi.put("/admin/restoreMember", {
        memberNo: member.memberNo,
      });
      if (resp.status === 200) {
        alert("복구 되었습니다!");
        getWithdrawnMemberList();
      }
    }
  };
  // 삭제된 게시글 목록 조회용 함수
  const getDeletedBoard = async () => {
    try {
      const resp = await axiosApi.get("/admin/deletedBoard");
      if (resp.status === 200) {
        setDeletedBoard(resp.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 삭제된 게시글 복구 요청 함수
  const restoreBoard = async (board) => {
    if (confirm(`${board.boardNo}번 게시글을 정말 복구하시겠습니까?`)) {
      const resp = await axiosApi.put("/admin/restoreBoard", {
        boardNo: board.boardNo,
      });
      if (resp.status === 200) {
        alert("게시글 복구 완료!");
        getDeletedBoard();
      }
    }
  };
  // Restore 컴포넌트가 첫 마운트 될 때 실행
  useEffect(() => {
    getWithdrawnMemberList();
    getDeletedBoard();
  }, []);

  // withdrawnMembers, deleteBoards 상태가 변경될 때 실행(isLoading 값 변경)
  useEffect(() => {
    if (withdrawnMembers !== null && deletedBoard !== null) {
      setIsLoading(false);
    }
  }, [withdrawnMembers, deletedBoard]);
  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="menu-box">
      <section className="section-border">
        <h2>탈퇴 회원 복구</h2>

        <h3>탈퇴한 회원 목록</h3>
        {withdrawnMembers.length === 0 ? (
          <p>탈퇴한 회원이 없습니다.</p>
        ) : (
          withdrawnMembers.map((member, index) => {
            return (
              <ul className="ul-board" key={index}>
                <p>회원 번호 : {member.memberNo}</p>
                <p>회원 이메일 : {member.memberEmail}</p>
                <p>회원 닉네임 : {member.memberNickname}</p>
                <button
                  className="restoreBtn"
                  onClick={() => restoreMember(member)}
                >
                  복구
                </button>
              </ul>
            );
          })
        )}
      </section>

      <section className="section-border">
        <h2>삭제 게시글 복구</h2>

        <h3>삭제된 게시글 목록</h3>
        {deletedBoard.length === 0 ? (
          <p>삭제된 게시글이 없습니다.</p>
        ) : (
          deletedBoard.map((board, index) => (
            <ul key={index}>
              <p>게시판 종류 : {board.boardName}</p>
              <p>게시글 번호 : {board.boardNo}</p>
              <p>게시글 제목 : {board.boardTitle}</p>
              <p>작성자 : {board.memberNickname}</p>
              <button
                className="restoreBtn"
                onClick={() => restoreBoard(board)}
              >
                복구
              </button>
            </ul>
          ))
        )}
      </section>
    </div>
  );
}
