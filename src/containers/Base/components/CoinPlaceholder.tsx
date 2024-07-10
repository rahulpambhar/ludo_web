import React from 'react';

import { getStyleObject } from '../../../containers/utils';
import { COIN_PLACEHOLDER_SIZE, COIN_SIZE } from '../../../globalConstants';
import { BaseColors } from '../../../state/interfaces';

import { Coin } from './Coin';

import styles from './CoinPlaceholder.module.css';
import { BaseID } from "../../Ludo/state/interfaces";

interface ICoinPlaceholderProps {
  baseColor: BaseColors;
  isCoinHidden: boolean;
  myBase: BaseID | undefined;
  baseId: BaseID;
  currentTurn: BaseID;
  onCoinClicked: () => void;
}

export class CoinPlaceholder extends React.PureComponent<ICoinPlaceholderProps> {
  render() {
    const { baseColor, isCoinHidden, currentTurn, baseId } = this.props;
    return (
      <div className={styles.Container} style={getStyleObject(COIN_PLACEHOLDER_SIZE, COIN_PLACEHOLDER_SIZE)}>
        <div className={currentTurn === baseId ? `${styles.Circle} ${styles.coinAnimation}` : styles.Circle}
          style={getStyleObject(COIN_SIZE, COIN_SIZE, baseColor)}>
          {
            isCoinHidden
              ? null
              : (
                <Coin baseColor={baseColor} onCoinClicked={() => this.props.onCoinClicked()} />
              )
          }
        </div>
      </div>
    );
  }
}
