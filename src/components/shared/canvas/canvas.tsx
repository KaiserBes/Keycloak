"use client";

import { useEffect, useRef } from "react";

const BarChart = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      const labels = [
        "Манасский район",
        "Нарынский район",
        "Айтматовский район",
        "Бакаи-Атинский район",
        "Ыссык-Кульский район",
        "Кочкорский район",
        "Тонский район",
        "Ак-Талинский район",
        "Ат-Башынский район",
        "Ак-Суйский район",
        "Жети-Огузский район",
        "Тюпский район",
        "Таласский район",
      ];
      const values = [5, 10, 15, 20, 25, 50, 75, 100, 125, 150, 175, 200, 300];

      const barHeight = 20;
      const barGap = 8;
      const chartTop = 40;
      const chartLeft = 120;
      const maxBarWidth = 450;

      const maxValue = Math.max(...values);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      labels.forEach((label, index) => {
        const value = values[index];
        const barWidth = (value / maxValue) * maxBarWidth;

        ctx.font = "14px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "right";
        ctx.fillText(
          label,
          chartLeft - 10,
          chartTop + index * (barHeight + barGap) + barHeight / 2 + 5
        );

        ctx.fillStyle = "#007bff";
        ctx.fillRect(
          chartLeft,
          chartTop + index * (barHeight + barGap),
          barWidth,
          barHeight
        );
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas ref={canvasRef} width={700} height={200}></canvas>
    </div>
  );
};

export default BarChart;
