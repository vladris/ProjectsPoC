import { makeStyles, tokens, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingVerticalXXL,
  },
  title: {
    marginBottom: tokens.spacingVerticalL,
  },
});

const App = (): JSX.Element => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text size={900} weight="bold" className={styles.title}>
        Welcome to Projects PoC
      </Text>
      <Text size={400}>
        A React application with Fluent UI components
      </Text>
    </div>
  );
};

export default App;
