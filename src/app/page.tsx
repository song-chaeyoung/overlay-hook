"use client";

import { useOverlay } from "@/hooks/useOverlay";
import React from "react";

const MyModal = ({ close }: { close: () => void; exit: () => void }) => {
  return (
    <div className="modal-content">
      <h2>모달 창</h2>
      <p>이것은 오버레이 모달입니다.</p>
      <button onClick={close}>닫기</button>
    </div>
  );
};
const MyModal2 = ({ close }: { close: () => void; exit: () => void }) => {
  return (
    <div className="modal-content">
      <h2>모달 창 두번째</h2>
      <p>이것은 오버레이 모달입니다.</p>
      <button onClick={close}>닫기</button>
    </div>
  );
};

const Page = () => {
  const { open } = useOverlay();
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <button onClick={() => open(MyModal)}>
        오버레이 모달을 오픈해주세요
      </button>
      <button onClick={() => open(MyModal2)}>
        오버레이 모달2를 오픈해주세요
      </button>
    </div>
  );
};

export default Page;
