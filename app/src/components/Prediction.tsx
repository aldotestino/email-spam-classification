type PredictionProps = {
  prediction: string;
};

function Prediction({ prediction }: PredictionProps) {
    
  return (
    <section>
      <p>Prediction: {
        prediction === 'ham' ? 
          <span className="text-green-600 font-bold text-lg">Not spam</span> : 
          <span className="text-red-600 font-bold text-lg">Spam</span>
      }</p>
    </section>
  );
}

export default Prediction;