import "../styles/globals.css";

import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import Layout from "../components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../utils/theme";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
