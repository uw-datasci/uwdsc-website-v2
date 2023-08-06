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

export type Subteam = {
  id: string;
  name: string;
  members: Member[];
};

export type Member = {
  id: string;
  name: string;
  position: string;
  image: StaticImageData;
  email?: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
};
