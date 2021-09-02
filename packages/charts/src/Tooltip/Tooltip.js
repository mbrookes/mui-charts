import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ChartContext from '../ChartContext';

const isInRange = (num, target, range) => {
  const result = num >= Math.max(0, target - range) && num <= target + range;
  return result;
};

function Tooltip(props) {
  const {
    data,
    dimensions: { boundedHeight },
    mousePosition,
    xKey,
    xScale,
    xTicks,
  } = useContext(ChartContext);

  const { stroke = 'rgba(200, 200, 200, 0.8)', strokeDasharray = '0', strokeWidth = 1 } = props;
  const strokeRef = React.useRef({});

  // eslint-disable-next-line prefer-spread
  const flatX = [].concat.apply([], data).map((d) => d[xKey]);
  const xOffsets = [...new Set(flatX.map((d) => xScale(d)))].sort(d3.ascending);

  // If the mouse is close to a vertical line, return true
  const isHighlighted = (offset) =>
    isInRange(mousePosition.x, offset, (xOffsets[1] - xOffsets[0]) / 2);

  return (
    <React.Fragment>
      {/* Fixme:  Popper seems prevent mouse events from bubbling from the anchorEl,
      so the marker line disapears when hovered. */}
      <Popper open={strokeRef.current !== null} placement="right" anchorEl={strokeRef.current}>
        <Paper>The content of the Popper.</Paper>
      </Popper>
      <g>
        <g transform={`translate(0, ${boundedHeight})`}>
          {xOffsets.map(
            (offset, index) =>
              isHighlighted(offset) && (
                <g key={index} transform={`translate(${offset}, 0)`}>
                  <line
                    ref={strokeRef}
                    y2={-boundedHeight}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    shapeRendering="crispEdges"
                  />
                </g>
              ),
          )}
        </g>
      </g>
    </React.Fragment>
  );
}

Tooltip.propTypes /* remove-proptypes */ = {
  /**
   * The stroke color of the marker line.
   */
  stroke: PropTypes.string,
  /**
   * The stroke pattern of the marker line.
   */
  strokeDasharray: PropTypes.string,
  /**
   * The stroke width of the marker line.
   */
  strokeWidth: PropTypes.number,
};
export default Tooltip;
