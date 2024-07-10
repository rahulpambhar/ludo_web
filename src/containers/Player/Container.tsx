/* eslint-disable @typescript-eslint/no-explicit-any */
import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Coin } from '../../containers/Base/components/Coin';
import { Dice } from '../../containers/Dice/Container';
import { IBase } from '../../containers/Ludo/state/interfaces';
import { basesSelector, coinsSelector, } from '../../containers/Ludo/state/selectors';
import { PlayerAvatar } from './components/PlayerAvatar';

import styles from './Container.module.css';

interface MyComponentProps {
  data: string;
}

interface IPublicProps {
  baseID: IBase['ID'];
  myBase: string;
  currentTurn: string;
  placement: 'top' | 'bottom';
  disabled: boolean;
}
interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
  coins: ReturnType<typeof coinsSelector>;
}

interface IProps extends IStateProps, IPublicProps, MyComponentProps { }

const mapStateToProps = createStructuredSelector<any, any>({
  bases: basesSelector,
  coins: coinsSelector,
});

class PlayerBare extends React.PureComponent<IProps> {

  render() {
    const { baseID, bases, placement, disabled, myBase, currentTurn } = this.props;


    const placementClass = placement === 'top' ? styles.TopPlacement : styles.BottomPlacement;
    const disabledClass = disabled ? styles.Disabled : null;
    const base = bases[baseID];

    return base && base.enabled
      ? (
        <div className={classnames(styles.Container, placementClass, disabledClass)}>
          <p style={{ fontSize: '14px', fontWeight: 'normal', color: '#ffffff', textAlign: 'center', background: '#041538' }} className={styles.username}>{base.name}</p>
          <h6 className='text-light'>{base.life}</h6>
          <PlayerAvatar baseColor={base.color} baseID={base.ID} myBase={myBase} currentTurn={currentTurn} />
          {/* {
            !disabled && */}
          <Dice baseColor={base.color} baseID={base.ID} myBase={myBase} isDisabled={disabled} />
          {/* } */}
          <div className={styles.RetiredCoins}>
            {
              base.coinIDs
                .filter((coinID) => this.props.coins[coinID].isRetired)
                .map((_coin, index) => (
                  <Coin
                    baseColor={base.color}
                    onCoinClicked={() => null}
                    key={index}
                  />
                ))
            }
          </div>
        </div>
      )
      : null;
  }
}

export const Player = connect(mapStateToProps)(PlayerBare) as unknown as React.ComponentClass<IPublicProps>;
