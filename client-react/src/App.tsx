import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState<Partial<{ hi: string; time: string }>>({});
  useEffect(() => {
    axios
      .get<{ hi: string; time: { now: string } }>('/api')
      .then((response) => {
        setData({ hi: response.data.hi, time: response.data.time.now });
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);
  return <div className='centered'>{data.time}</div>;
};

export default App;
