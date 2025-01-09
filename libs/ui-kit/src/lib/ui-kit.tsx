import styles from './ui-kit.module.scss';
import GlobalStyles from '../../../../global-styles';

export function UiKit() {
  return (
    <div className={styles['container']}>
      <GlobalStyles />
      <h1>Welcome to UiKit!</h1>
    </div>
  );
}

export default UiKit;
