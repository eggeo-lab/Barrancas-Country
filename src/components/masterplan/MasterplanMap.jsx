import { useCallback, useMemo, useRef, useState } from 'react';
import { LOTS, ROAD_PATHS, PLAN_TRANSFORM } from '../../data/masterplan';
import aerialBg from '../../assets/images/masterplan-aerial.jpg';
import { STATUS_META, fmtArea } from './statusUtils';

const CANVAS = { x: 0, y: 0, w: 1600, h: 950 };
const MOVE_THRESHOLD = 4; // px de tolerancia antes de considerar que fue un arrastre, no un tap

export default function MasterplanMap({ statuses, activeFilter, selected, onSelect }) {
  const [vb, setVb] = useState({ ...CANVAS });
  const [tooltip, setTooltip] = useState(null);
  const viewportRef = useRef(null);
  const dragState = useRef(null);

  const clampVB = useCallback((box) => {
    const w = Math.min(box.w, CANVAS.w);
    const h = Math.min(box.h, CANVAS.h);
    const maxX = CANVAS.x + CANVAS.w - w;
    const maxY = CANVAS.y + CANVAS.h - h;
    return {
      w,
      h,
      x: Math.min(Math.max(box.x, CANVAS.x), maxX),
      y: Math.min(Math.max(box.y, CANVAS.y), maxY),
    };
  }, []);

  const zoom = useCallback((factor) => {
    setVb((prev) => {
      const nw = Math.max(400, Math.min(1600, prev.w * factor));
      const nh = nw * (950 / 1600);
      const px = prev.x + prev.w / 2;
      const py = prev.y + prev.h / 2;
      return clampVB({
        x: px - (px - prev.x) * (nw / prev.w),
        y: py - (py - prev.y) * (nh / prev.h),
        w: nw,
        h: nh,
      });
    });
  }, [clampVB]);

  const resetView = () => setVb({ ...CANVAS });

  // Selección resuelta a partir del elemento donde arrancó el gesto (pointerdown),
  // no del evento "click" del navegador: al usar setPointerCapture para poder
  // arrastrar el mapa, el click posterior puede quedar retargeteado al
  // contenedor y perderse el lote específico que se tocó.
  const onPointerDown = (e) => {
    const lotEl = e.target.closest?.('[data-lot-id]');
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      vb: { ...vb },
      moved: false,
      lotId: lotEl ? lotEl.getAttribute('data-lot-id') : null,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!viewportRef.current) return;

    if (dragState.current) {
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      if (Math.abs(dx) > MOVE_THRESHOLD || Math.abs(dy) > MOVE_THRESHOLD) {
        dragState.current.moved = true;
      }
      if (dragState.current.moved) {
        const rect = viewportRef.current.getBoundingClientRect();
        const scale = dragState.current.vb.w / rect.width;
        setVb(
          clampVB({
            x: dragState.current.vb.x - dx * scale,
            y: dragState.current.vb.y - dy * scale,
            w: dragState.current.vb.w,
            h: dragState.current.vb.h,
          })
        );
      }
    }

    const lotEl = e.target.closest?.('[data-lot-id]');
    if (lotEl) {
      const lot = LOTS.find((l) => l.id === lotEl.getAttribute('data-lot-id'));
      const rect = viewportRef.current.getBoundingClientRect();
      setTooltip({ lot, x: e.clientX - rect.left, y: e.clientY - rect.top });
    } else {
      setTooltip(null);
    }
  };

  const onPointerUp = () => {
    if (dragState.current && !dragState.current.moved) {
      onSelect(dragState.current.lotId);
    }
    dragState.current = null;
  };

  const lotsWithMeta = useMemo(
    () =>
      LOTS.map((l) => ({
        ...l,
        status: statuses[l.id],
        match: activeFilter === 'all' || statuses[l.id] === activeFilter,
      })),
    [statuses, activeFilter]
  );

  return (
    <div
      ref={viewportRef}
      className="relative w-full aspect-[16/9.5] bg-[#0f1c13] rounded-sm overflow-hidden touch-none select-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={() => setTooltip(null)}
    >
      <svg viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} className="w-full h-full">
        <defs>
          <linearGradient id="roadFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d9cead" />
            <stop offset="100%" stopColor="#c3b489" />
          </linearGradient>
        </defs>

        <image
          x="0"
          y="0"
          width="2048"
          height="1125"
          preserveAspectRatio="none"
          pointerEvents="none"
          transform="matrix(1.061447 -0.164491 -0.020944 1.155442 -217.223 12.209)"
          href={aerialBg}
        />

        <g transform={PLAN_TRANSFORM}>
          <g>
            {ROAD_PATHS.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="url(#roadFill)"
                stroke="#9c8f6c"
                strokeWidth="1.4"
                strokeOpacity="0.6"
              />
            ))}
          </g>

          <g>
            {lotsWithMeta.map((lot) => (
              <path
                key={lot.id}
                data-lot-id={lot.id}
                d={lot.d}
                fill={STATUS_META[lot.status].color}
                fillOpacity={lot.match ? (selected === lot.id ? 0.92 : 0.72) : 0.18}
                stroke={selected === lot.id ? '#f6f2e6' : '#2c2013'}
                strokeWidth={selected === lot.id ? 2.2 : 0.8}
                strokeOpacity={selected === lot.id ? 0.95 : 0.5}
                className="cursor-pointer transition-[fill-opacity] duration-150"
              />
            ))}
          </g>

          <g pointerEvents="none">
            {lotsWithMeta.map((lot) => (
              <g key={lot.id} opacity={lot.match ? 1 : 0.25}>
                <text
                  x={lot.cx}
                  y={lot.cy - 3}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="'Jost', sans-serif"
                  fill="#f6f2e6"
                  style={{ paintOrder: 'stroke', stroke: '#16281b', strokeWidth: 2.5 }}
                >
                  {lot.num}
                </text>
                <text
                  x={lot.cx}
                  y={lot.cy + 9}
                  textAnchor="middle"
                  fontSize="8.5"
                  fontFamily="'Jost', sans-serif"
                  fill="#e8e3d2"
                  style={{ paintOrder: 'stroke', stroke: '#16281b', strokeWidth: 2 }}
                >
                  {fmtArea(lot.area)}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded bg-forest-dark/95 border border-gold/30 px-3 py-2 text-xs text-cream shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <b className="text-gold">{tooltip.lot.id}</b> · {fmtArea(tooltip.lot.area)}
          <br />
          <span
            className="inline-block mt-1 rounded-full px-2 py-0.5 text-[10px]"
            style={{ background: STATUS_META[statuses[tooltip.lot.id]].color, color: '#16281b' }}
          >
            {STATUS_META[statuses[tooltip.lot.id]].label}
          </span>
        </div>
      )}

      {/* Controles de zoom — solo mobile, donde no hay pinch-to-zoom nativo sobre el SVG.
          Reutilizan zoom()/resetView(), que ya manejan el paneo por drag/touch. */}
      <div className="sm:hidden absolute bottom-3 right-3 z-20 flex flex-col gap-2">
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => zoom(1 / 1.4)}
          aria-label="Acercar plano"
          className="w-10 h-10 rounded-full bg-forest-dark/95 border border-gold/40 text-cream text-lg leading-none flex items-center justify-center shadow-lg active:bg-forest"
        >
          +
        </button>
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => zoom(1.4)}
          aria-label="Alejar plano"
          className="w-10 h-10 rounded-full bg-forest-dark/95 border border-gold/40 text-cream text-lg leading-none flex items-center justify-center shadow-lg active:bg-forest"
        >
          −
        </button>
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={resetView}
          aria-label="Restablecer zoom"
          className="w-10 h-10 rounded-full bg-forest-dark/95 border border-gold/40 text-cream text-[10px] tracking-wide flex items-center justify-center shadow-lg active:bg-forest"
        >
          100%
        </button>
      </div>
    </div>
  );
}
