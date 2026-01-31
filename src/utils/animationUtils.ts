export const PHRASE = "VISITA • INTERIORA • TERRAE • RECTIFICANDO • INVENIES • OCCULTUM • LAPIDEM • ";

export const easeFunction = (p: number): number => p * p * (3 - 2 * p);

export const createSpiralPath = (
  svgElement: SVGSVGElement,
  itemSpacingY: number,
  spiralRadiusBase: number,
  itemAngleStep: number
): void => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const centerX = w / 2;
  const centerY = h / 2;
  const radiusX = Math.min(w, h) * spiralRadiusBase;

  const totalItemsRange = 6;
  const totalSpiralHeight = itemSpacingY * totalItemsRange;
  const pointsTotal = 400;

  let d = '';
  const startY = centerY - totalSpiralHeight / 2;

  let first = true;
  for (let i = 0; i <= pointsTotal; i++) {
    const t = i / pointsTotal;
    const currentY = startY + t * totalSpiralHeight;

    const relativeY = currentY - centerY;
    const angleDeg = (relativeY / itemSpacingY) * itemAngleStep;
    const angleRad = angleDeg * (Math.PI / 180);

    const x = centerX + Math.cos(angleRad) * radiusX;
    const zOffset = Math.sin(angleRad) * 40;

    if (first) {
      d += `M ${x} ${currentY + zOffset}`;
      first = false;
    } else {
      d += ` L ${x} ${currentY + zOffset}`;
    }
  }

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', d);
  path.setAttribute('stroke', 'url(#goldGradient)');
  path.setAttribute('stroke-width', '0.5');
  path.setAttribute('fill', 'none');
  path.setAttribute('opacity', '0.3');
  path.id = 'spiral-line';

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  grad.id = 'goldGradient';
  grad.innerHTML =
    '<stop offset="0%" stop-color="#bf953f" /><stop offset="50%" stop-color="#b38728" /><stop offset="100%" stop-color="#aa771c" />';
  defs.appendChild(grad);

  svgElement.innerHTML = '';
  svgElement.appendChild(defs);
  svgElement.appendChild(path);
};

export const initRandomGlows = (): void => {
  const geometryLines = document.querySelectorAll(
    '#reassembly-svg path, #reassembly-svg line, #reassembly-svg circle, #reassembly-svg rect, #reassembly-svg polygon'
  );
  if (!geometryLines.length) return;

  function triggerRandomGlow() {
    const randomIndex = Math.floor(Math.random() * geometryLines.length);
    const element = geometryLines[randomIndex] as HTMLElement;
    element.classList.add('glow-active');
    setTimeout(() => {
      element.classList.remove('glow-active');
    }, 2000);
    const nextTime = Math.random() * 700 + 100;
    setTimeout(triggerRandomGlow, nextTime);
  }
  triggerRandomGlow();
};
