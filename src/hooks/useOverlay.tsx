// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useCallback,
// } from "react";

// interface OverlayContextType {
//   open: (
//     component: (props: { close: () => void; exit: () => void }) => ReactNode
//   ) => void;
//   close: () => void;
//   exit: () => void;
// }

// const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// export function OverlayProvider({ children }: { children: ReactNode }) {
//   const [OverlayComponent, setOverlayComponent] = useState<
//     ((props: { close: () => void; exit: () => void }) => ReactNode) | null
//   >(null);
//   const [isClosing, setIsClosing] = useState(false);

//   // 오버레이를 닫기 위한 close 함수 (애니메이션 적용)
//   const close = useCallback(() => {
//     setIsClosing(true);
//     setTimeout(() => {
//       exit();
//     }, 300); // 애니메이션 시간이 끝나면 exit 실행
//   }, []);

//   // 오버레이를 완전히 종료하는 exit 함수
//   const exit = useCallback(() => {
//     setIsClosing(false);
//     setOverlayComponent(null); // 오버레이를 실제로 언마운트
//   }, []);

//   // 오버레이를 여는 함수
//   const open = (
//     component: (props: { close: () => void; exit: () => void }) => ReactNode
//   ) => {
//     setOverlayComponent(() => component);
//     setIsClosing(false); // 초기화
//   };

//   return (
//     <OverlayContext.Provider value={{ open, close, exit }}>
//       {children}
//       {OverlayComponent && (
//         <div
//           className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
//             isClosing ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           <div
//             className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
//               isClosing ? "scale-90 opacity-0" : "scale-100 opacity-100"
//             }`}
//           >
//             {OverlayComponent({ close, exit })}
//           </div>
//         </div>
//       )}
//     </OverlayContext.Provider>
//   );
// }

// export function useOverlay() {
//   const context = useContext(OverlayContext);
//   if (!context) {
//     throw new Error("useOverlay must be used within an OverlayProvider");
//   }
//   return context;
// }

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Context 타입 정의
interface OverlayContextType {
  open: (component: ReactNode) => void;
  close: () => void;
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// ✅ Provider 구현
export function OverlayProvider({ children }: { children: ReactNode }) {
  const [OverlayComponent, setOverlayComponent] = useState<ReactNode | null>(
    null
  );

  // 모달 닫기 함수 (exit 애니메이션 후 언마운트)
  const close = useCallback(() => {
    setOverlayComponent(null);
  }, []);

  // 모달 열기 함수
  const open = useCallback((component: ReactNode) => {
    setOverlayComponent(component);
  }, []);

  return (
    <OverlayContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {OverlayComponent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {OverlayComponent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OverlayContext.Provider>
  );
}

// ✅ Custom Hook
export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}
