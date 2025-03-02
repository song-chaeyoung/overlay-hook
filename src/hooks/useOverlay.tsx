"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface OverlayContextType {
  open: (
    component: (props: { close: () => void; exit: () => void }) => ReactNode
  ) => void;
  close: () => void;
  exit: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [OverlayComponent, setOverlayComponent] = useState<
    ((props: { close: () => void; exit: () => void }) => ReactNode) | null
  >(null);
  const [isClosing, setIsClosing] = useState(false);

  // 오버레이를 닫기 위한 close 함수 (애니메이션 적용)
  const close = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      exit();
    }, 300); // 애니메이션 시간이 끝나면 exit 실행
  }, []);

  // 오버레이를 완전히 종료하는 exit 함수
  const exit = useCallback(() => {
    setIsClosing(false);
    setOverlayComponent(null); // 오버레이를 실제로 언마운트
  }, []);

  // 오버레이를 여는 함수
  const open = (
    component: (props: { close: () => void; exit: () => void }) => ReactNode
  ) => {
    setOverlayComponent(() => component);
    setIsClosing(false); // 초기화
  };

  return (
    <OverlayContext.Provider value={{ open, close, exit }}>
      {children}
      {OverlayComponent && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
              isClosing ? "scale-90 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            {OverlayComponent({ close, exit })}
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
