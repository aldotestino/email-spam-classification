import { PromptSchema } from '@/lib/validators';
import { client } from './client';
import { PredictResponse } from '@/lib/types';

export class ClassifierApi {
  static async predict(body: PromptSchema): Promise<PredictResponse> {
    const { data } = await client.post('/predict', body);
    return data;
  }
}