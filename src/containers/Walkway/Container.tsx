/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { flatArray } from '../../connections/utils';
import { Coin } from '../../containers/Base/components/Coin';
import { currentDieRollSelector, isDieRollValidSelector } from '../../containers/Dice/state/selectors';
import { moveCoin } from '../../containers/Ludo/state/actions';
import { CellType, ICell, ICoin, IServerGameData, IWalkway } from '../../containers/Ludo/state/interfaces';
import { basesSelector, cellsSelector, coinsSelector, currentTurnSelector, linksSelector, myBaseSelector } from '../../containers/Ludo/state/selectors';
import { getStyleObject } from '../../containers/utils';
import { COIN_SIZE, WALKWAY_LENGTH, WALKWAY_WIDTH, WINNING_MOVES } from '../../globalConstants';
import { hideContextMenu, showContextMenu } from '../../services/contextMenu/service';
import { WalkwayPosition } from '../../state/interfaces';

import { Cell } from './components/Cell';
import { IContextMenuOptions } from './interfaces';
import { generateCellID } from './utils';

import styles from './Container.module.css';
import socket from "../../connections/socket";

interface IPublicProps {
  walkway: IWalkway;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
  cells: ReturnType<typeof cellsSelector>;
  coins: ReturnType<typeof coinsSelector>;
  links: ReturnType<typeof linksSelector>;
  isDieRollValid: ReturnType<typeof isDieRollValidSelector>;
  currentTurn: ReturnType<typeof currentTurnSelector>;
  currentDieRoll: ReturnType<typeof currentDieRollSelector>;
  myBase: ReturnType<typeof myBaseSelector>;
}

interface IDispatchProps {
  moveCoin: typeof moveCoin;
}

interface IProps extends IPublicProps, IStateProps, IDispatchProps { }

const cells: IServerGameData['cells'] = {};
const cellLinks: { [cellID: string]: Set<ICell['cellID']> } = {};

const mapStateToProps = createStructuredSelector<any, any>({
  bases: basesSelector,
  cells: cellsSelector,
  coins: coinsSelector,
  currentTurn: currentTurnSelector,
  isDieRollValid: isDieRollValidSelector,
  links: linksSelector,
  currentDieRoll: currentDieRollSelector,
  myBase: myBaseSelector,
});

const mapDispatchToProps = {
  moveCoin,
};

class WalkwayBare extends React.PureComponent<IProps> {

  disable = false;

  render() {
    const isHorizontal = this.isHorizontalWalkway();

    return (
      <div
        className={styles.Container}
        style={
          isHorizontal
            ? getStyleObject(WALKWAY_LENGTH, WALKWAY_WIDTH)
            : getStyleObject(WALKWAY_WIDTH, WALKWAY_LENGTH)
        }
      >
        {
          this.renderCells()
        }
      </div>
    );
  }

  private renderCells = () => {
    const {
      walkway: { position, baseID },
      cells: cellConfigurations,
      bases,
      coins,
    } = this.props;

    const cellComponents: any[][] = [[]];

    const cellConfigurationsForWalkway = Object.values(cellConfigurations[position]);
    const base = bases[baseID];

    cellConfigurationsForWalkway.forEach((cellConfiguration, index) => {
      const { row, column, position } = cellConfiguration;
      const cellID = generateCellID(position, row, column);
      const cellType = cellConfigurations[position][cellID].cellType;
      cellComponents[cellConfiguration.row] = cellComponents[cellConfiguration.row] || [];
      cellComponents[cellConfiguration.row][cellConfiguration.column] =
        <Cell
          key={index}
          column={column}
          row={row}
          walkwayPosition={position}
          color={[CellType.HOMEPATH, CellType.SPAWN].includes(cellType) ? base.color : undefined}
          isStar={cellType === CellType.STAR}
          cellType={cellType}
          onContextMenuOpened={this.onContextMenuOpened}
          onHighlightNextCells={this.onHighlightNextCells}
        >
          {
            cellConfiguration.coinIDs.map((coinID, index) => (
              <Coin
                baseColor={coins[coinID].color}
                coinSize={cellConfiguration.coinIDs.length > 1 ? COIN_SIZE / 2 : COIN_SIZE}
                onCoinClicked={() => this.onCoinClicked(coinID, position, cellID)}
                key={index}
              />
            ))
          }
        </Cell>;
    });

    return flatArray(cellComponents);
  }

  private isHorizontalWalkway = () => [
    WalkwayPosition.EAST,
    WalkwayPosition.WEST,
  ].includes(this.props.walkway.position)

  private onContextMenuOpened = (options: IContextMenuOptions) => {
    const { walkway: { baseID } } = this.props;
    const {
      cellID,
      cellType,
      column,
      position,
      row,
      x,
      y,
    } = options;
    const cellInfo: ICell = {
      baseID,
      cellID,
      cellType,
      coinIDs: [],
      column,
      position,
      row,
    };
    showContextMenu(
      x,
      y,
      [{
        action: () => this.markCells({ ...cellInfo, cellType: CellType.NORMAL }),
        label: CellType.NORMAL,
      }, {
        action: () => this.markCells({ ...cellInfo, cellType: CellType.SPAWN }),
        label: CellType.SPAWN,
      }, {
        action: () => this.markCells({ ...cellInfo, cellType: CellType.STAR }),
        label: CellType.STAR,
      }, {
        action: () => this.markCells({ ...cellInfo, cellType: CellType.HOMEPATH }),
        label: CellType.HOMEPATH,
      }, {
        action: () => this.linkCells(cellInfo),
        label: 'Link',
      }],
    );
  }

  private onHighlightNextCells = (cellID: ICell['cellID']) => {
    const { links } = this.props;
    const linkedCellIDs = links[cellID].map((cell) => cell.cellID);
    console.warn(`${cellID} -> ${linkedCellIDs}`);
  }

  private markCells = (cellInfo: ICell) => {
    cells[cellInfo.position] = cells[cellInfo.position] || {};
    cells[cellInfo.position][cellInfo.cellID] = cellInfo;
    hideContextMenu();
  }

  private linkCells = (cellInfo: ICell) => {
    hideContextMenu();
    const onClick = (event: MouseEvent) => {
      const element = event.target as HTMLDivElement;
      const cellID = element.getAttribute('data-id') as string;
      const shouldLink = window.confirm(`Link ${cellInfo.cellID} to ${cellID} ?`);

      if (shouldLink) {
        cellLinks[cellInfo.cellID] = cellLinks[cellInfo.cellID] || new Set();
        cellLinks[cellInfo.cellID].add(cellID);
      }
      document.removeEventListener('click', onClick);
      (window as any).cellLinks = cellLinks;
    };
    document.addEventListener('click', onClick);
  }

  private onCoinClicked = (coinID: ICoin['coinID'], position: WalkwayPosition, cellID: ICell['cellID']) => {

    if (this.disable) {
      return;
    }
    this.disable = true;
    const { coins, currentTurn, bases, myBase, currentDieRoll, isDieRollValid } = this.props;

    console.log(isDieRollValid);
    const coin = coins[coinID];
    if (this.props.isDieRollValid && coin.baseID === currentTurn && myBase === currentTurn) {
      const movableCoins =
        bases[currentTurn].coinIDs
          .filter((coinID) =>
            coins[coinID].isSpawned
            && !coins[coinID].isRetired
            && coins[coinID].steps + currentDieRoll <= WINNING_MOVES,
          );

      const isCoinMovable = movableCoins.includes(coinID);
      if (isCoinMovable) {
        socket.emit('moveCoin', { coinID, position, cellID, currentDieRoll }, (disable: boolean) => {
          this.disable = disable;
        })
      } else {
        this.disable = false;
      }
    } else {
      this.disable = false;
    }
  }
}

export const Walkway = connect(mapStateToProps, mapDispatchToProps)(WalkwayBare) as unknown as React.ComponentClass<IPublicProps>;
