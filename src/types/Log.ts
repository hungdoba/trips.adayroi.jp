export type Log = {
  timestamp: string;
  title: string;
  content: string;
  tag?: string;
  author?: string;
};

interface Image {
  src: string;
  alt: string;
  caption: string;
}

export interface Trip {
  id: number;
  date: string;
  title: string;
  tag: string;
  images: Image[];
}
