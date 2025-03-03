"use client";

import { useOverlay } from "@/hooks/useOverlay";
import React from "react";

const MyModal = ({ close }: { close: () => void }) => {
  const { open } = useOverlay();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2>모달 창</h2>
      <p>이것은 오버레이 모달입니다.</p>
      <br />
      <button className="border p-4 rounded-lg cursor-pointer" onClick={close}>
        닫기
      </button>
      <br />
      <br />
      <button
        className="border p-4 rounded-lg cursor-pointer"
        onClick={() => open(<MyModal2 close={close} />)}
      >
        두번째 모달 열기
      </button>
    </div>
  );
};
const MyModal2 = ({ close }: { close: () => void }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2>모달 창 두번째</h2>
      <p>이것은 오버레이 모달입니다.</p>
      <br />
      <button className="border p-4 rounded-lg cursor-pointer" onClick={close}>
        닫기
      </button>
    </div>
  );
};

const Page = () => {
  const { open, close } = useOverlay();
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <button
        className="border p-4 rounded-lg cursor-pointer"
        onClick={() => open(<MyModal close={close} />)}
      >
        모달 열기
      </button>
    </div>
  );
};

export default Page;
