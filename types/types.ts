import { type StaticImageData } from 'next/image';

export type Event = {
  id: string;
  title: string;
  description?: string;
  image: StaticImageData;
  date?: string;
  location?: string;
  link?: string;
};
