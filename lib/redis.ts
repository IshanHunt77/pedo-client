import * as transformers from '@xenova/transformers';
import {
  createClient,
  SCHEMA_FIELD_TYPE,
} from 'redis';

type SearchDocument = {
  id: string;
  value: {
    content: string;
    score: string;
  };
};
type SearchResult = {
  total: number;
  documents: SearchDocument[];
};


export const redisConnect = async () => {
  try {
    const client = createClient({ url: 'redis://localhost:6379' });
    await client.connect();
    console.log('redis connected');
    return client;
  } catch (error) {
    console.error('Error connecting to redis:', error);
    throw error;
  }
};




