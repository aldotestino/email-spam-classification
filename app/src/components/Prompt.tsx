import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormControl, FormMessage, FormItem, FormLabel } from './ui/form';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { PromptSchema, promptSchema } from '@/lib/validators';

type PromptProps = {
  onSubmit: (data: PromptSchema) => void;
};

function Prompt({ onSubmit }: PromptProps) {

  const form = useForm<PromptSchema>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      text: '',
    },
  });
 

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end gap-2">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor={field.name}>Insert email or SMS body</FormLabel>
                <FormControl>
                  <Textarea placeholder="Dear..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="">Predict</Button>
        </form>
      </Form>
    </section>
  );
}

export default Prompt;