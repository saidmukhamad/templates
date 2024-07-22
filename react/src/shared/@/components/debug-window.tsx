import { useState, useRef, useEffect, useCallback } from "react";
import { X, Maximize2, Minimize2, Bug } from "lucide-react";

const FloatingDebugWindow = ({ children, title = "Debug Window" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 340, y: 20 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPosition((prev) => ({
        x: Math.max(0, Math.min(window.innerWidth - 320, prev.x + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 400, prev.y + dy)),
      }));
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = useCallback(
    (e) => {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
    setIsExpanded(true);
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <>
      {isVisible ? (
        <div
          ref={windowRef}
          className="fixed bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: isExpanded ? "320px" : "160px",
            height: isExpanded ? "400px" : "40px",
            transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
          }}
        >
          <div className="flex justify-between items-center p-2 cursor-move bg-gray-700" onMouseDown={handleMouseDown}>
            <span className="font-bold">{title}</span>
            <div className="flex space-x-2">
              <button onClick={toggleExpanded} className="focus:outline-none hover:text-blue-300 transition-colors">
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button onClick={toggleVisibility} className="focus:outline-none hover:text-red-300 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className={`p-2 overflow-auto ${isExpanded ? "block" : "hidden"}`} style={{ height: "calc(100% - 40px)" }}>
            {children}
          </div>
        </div>
      ) : (
        <button
          onClick={toggleVisibility}
          className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors focus:outline-none"
          aria-label="Open Debug Window"
        >
          <Bug size={24} />
        </button>
      )}
    </>
  );
};

export default FloatingDebugWindow;
