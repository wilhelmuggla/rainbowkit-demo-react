import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider} from 'wagmi';
import "@rainbow-me/rainbowkit/styles.css";
import SignMessage from './SignMessage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col } from 'react-bootstrap'
import './App.css'



function App() {
  const { chains, provider } = configureChains(
    [chain.mainnet, chain.ropsten],
    [apiProvider.fallback()]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains,
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return<WagmiProvider client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <>
        <Container>
          <Row className='justify-content-center'>
            <Col className='mt-5' md={6}>
              <ConnectButton className="mx-auto" />
              <Card className='justify-content-center'>
                <SignMessage />
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </RainbowKitProvider>
  </WagmiProvider>

}

export default App;
