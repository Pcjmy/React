import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { useState } from "react";

export default function DraggableCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // 订阅 motion value 的变化
  useMotionValueEvent(x, "change", (latest) => {
    setCoords((prev) => ({ ...prev, x: latest }));
  });

  useMotionValueEvent(y, "change", (latest) => {
    setCoords((prev) => ({ ...prev, y: latest }));
  });

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <motion.div
        drag
        style={{
          width: 100,
          height: 100,
          backgroundColor: "skyblue",
          borderRadius: 20,
          x, // 绑定 motion value
          y,
        }}
      />
      <div style={{ marginLeft: 20 }}>
        <p>X: {coords.x.toFixed(0)}</p>
        <p>Y: {coords.y.toFixed(0)}</p>
      </div>
    </div>
  );
}
