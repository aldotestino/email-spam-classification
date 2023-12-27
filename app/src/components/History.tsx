import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import { PredictResponse } from '@/lib/types';
import HistoryCard from './HistoryCard';

type HistoryProps = {
  history: PredictResponse[]
};

function History({ history }: HistoryProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Bars3Icon className="w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className='space-y-4 overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>History</SheetTitle>
          <SheetDescription>
            There you can find the last predictions you made.
          </SheetDescription>
        </SheetHeader>

        {history.map((item, index) => <HistoryCard key={index} {...item} />)}

      </SheetContent>
    </Sheet>
  );
}

export default History;