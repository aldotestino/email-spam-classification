import Prediction from './components/Prediction';
import History from './components/History';
import Prompt from './components/Prompt';
import { useMutation } from 'react-query';
import { ClassifierApi } from './api/predict';
import { PredictResponse } from './lib/types';
import { useState } from 'react';

function App() {

  const [history, setHistory] = useState<PredictResponse[]>(JSON.parse(localStorage.getItem('history') || '[]'));

  const predict = useMutation({
    mutationFn: ClassifierApi.predict,
    onSuccess: (data) => {
      const prevLocalStorageHistory = localStorage.getItem('history');
      if (prevLocalStorageHistory) {
        const parsedHistory = JSON.parse(prevLocalStorageHistory) as PredictResponse[];
        localStorage.setItem('history', JSON.stringify([data, ...parsedHistory]));
      } else {
        localStorage.setItem('history', JSON.stringify([data]));
      }
      setHistory(ph => [data, ...ph]);
    }
  });

  return (
    <main className="min-h-screen py-8 px-4 sm:px-0">
      <div className="w-full max-w-lg mx-auto space-y-8">
        <header className="flex items-center space-x-8 fixed top-0 bg-white py-4 w-full">
          <History history={history} />
          <h1 className="text-lg font-bold">email-spam-classifier</h1>
        </header>
        <Prompt onSubmit={predict.mutateAsync} />
        {predict.isSuccess && <Prediction prediction={predict.data.prediction} />}
      </div>
    </main>
  );
}

export default App;
