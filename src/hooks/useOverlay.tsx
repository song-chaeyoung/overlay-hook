"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface OverlayContextType {
  open: (component: ReactNode) => void;
  close: () => void;
  exit: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ReactNode[]>([]);

  // 모달을 여는 함수
  const open = (component: ReactNode) => {
    setModals((prev) => [...prev, component]); // ✅ 여러 개의 모달 추가 가능
  };

  // 마지막 모달만 닫는 함수
  const close = useCallback(() => {
    setModals((prev) => prev.slice(0, -1)); // ✅ 배열의 마지막 요소만 제거
  }, []);

  // 모든 모달을 닫는 함수
  const exit = useCallback(() => {
    setModals([]); // ✅ 모든 모달 초기화
  }, []);

  return (
    <OverlayContext.Provider value={{ open, close, exit }}>
      {children}
      {modals.length > 0 &&
        modals.map((Modal, index) => (
          <div
            key={index}
            className="fixed inset-0 flex items-center justify-center bg-black/20"
          >
            <div className="absolute">{Modal}</div>
          </div>
        ))}
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

// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useCallback,
// } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// // ✅ Context 타입 정의
// interface OverlayContextType {
//   open: (component: ReactNode) => void;
//   close: () => void;
// }

// const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// // ✅ Provider 구현
// export function OverlayProvider({ children }: { children: ReactNode }) {
//   const [OverlayComponent, setOverlayComponent] = useState<ReactNode | null>(
//     null
//   );

//   // 모달 닫기 함수 (exit 애니메이션 후 언마운트)
//   const close = useCallback(() => {
//     setOverlayComponent(null);
//   }, []);

//   // 모달 열기 함수
//   const open = useCallback((component: ReactNode) => {
//     setOverlayComponent(component);
//   }, []);

//   return (
//     <OverlayContext.Provider value={{ open, close }}>
//       {children}
//       <AnimatePresence>
//         {OverlayComponent && (
//           <motion.div
//             className="fixed inset-0 flex items-center justify-center bg-black/50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {OverlayComponent}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </OverlayContext.Provider>
//   );
// }

// // ✅ Custom Hook
// export function useOverlay() {
//   const context = useContext(OverlayContext);
//   if (!context) {
//     throw new Error("useOverlay must be used within an OverlayProvider");
//   }
//   return context;
// }
