"use client";

import { useEffect, useRef } from "react";

const BarChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const data = [
          { label: "Манасский район", value: 10 },
          { label: "Нарынский район", value: 30 },
          { label: "Айтматовский район", value: 40 },
          { label: "Бакaй-Атинский район", value: 60 },
          { label: "Иссык-Кульский район", value: 80 },
          { label: "Кочкорский район", value: 100 },
          { label: "Тонский район", value: 50 },
          { label: "Ак-Талинский район", value: 70 },
          { label: "Ат-Башинский район", value: 110 },
          { label: "Ак-Суйский район", value: 150 },
          { label: "Жети-Огузский район", value: 130 },
          { label: "Тюпский район", value: 200 },
          { label: "Таласский район", value: 300 },
        ];

        const chartWidth = canvas.offsetWidth;
        const chartHeight = 500;
        const barHeight = 5;
        const padding = 30;
        const maxBarWidth = Math.max(...data.map((d) => d.value));

        canvas.width = chartWidth;
        canvas.height = chartHeight;

        ctx.clearRect(0, 0, chartWidth, chartHeight);

        const labelWidth = 180;
        const startX = labelWidth + 20;

        const scaleFactor = 1;

        data.forEach((d, index) => {
          const x = startX;
          const y = index * (barHeight + padding);
          const barWidth =
            (d.value / maxBarWidth) * (chartWidth - startX - 50) * scaleFactor;

          ctx.fillStyle = "#000";
          ctx.font = "16px sans-serif";
          ctx.textBaseline = "middle";
          ctx.textAlign = "right";
          ctx.fillText(d.label, startX - 20, y + barHeight / 2);

          ctx.fillStyle = "#3B82F6";
          ctx.fillRect(x, y, barWidth, barHeight);
        });
      }
    }
  }, []);

  return (
    <div className="flex-grow p-6">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default BarChart;
