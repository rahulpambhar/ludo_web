import { BaseColors } from '../state/interfaces';

import { BASE_COLORS, CELL_DIMENSION } from '../globalConstants';

export const getStyleObject = (
  cellCountLengthwise: number,
  cellCountWidthwise: number,
  baseColor?: BaseColors,
): React.CSSProperties => ({
  backgroundColor: baseColor && getBaseHexColor(baseColor),
  height: `${cellCountWidthwise * CELL_DIMENSION}px`,
  width: `${cellCountLengthwise * CELL_DIMENSION}px`,
});

export const getBaseHexColor = (color: BaseColors) => BASE_COLORS[color];

export const getError = () => {
  const modal = document.getElementById('ErrorModel');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }
}
export const getSuccess = () => {
  const modal = document.getElementById('SuccessModel');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }
}
