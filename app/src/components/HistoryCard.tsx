import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PredictResponse } from '@/lib/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

function HistoryCard({ text, prediction }:PredictResponse) {

  const [truncated, setTruncated] = useState(true);

  function toggleTruncated() {
    setTruncated(ps => !ps);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn(prediction === 'ham' ? 'text-green-600' : 'text-red-600' )}>{
          prediction === 'ham' ? 'Not spam' : 'Spam'
        }</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn(truncated ? 'truncate' : '')} >{text}</p>
        <Button onClick={toggleTruncated} className="p-0" variant="link">
          {truncated ? 'Show more' : 'Show less'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default HistoryCard;