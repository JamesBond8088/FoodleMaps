import "@/styles/globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import '@aws-amplify/ui-react/styles.css';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

export default function App({ Component, pageProps }) {

  return (
    <div>
      <Component {...pageProps} />
    </div >
  );
}
