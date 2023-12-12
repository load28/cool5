interface Tag {
  id: string;
  name: string;
}

export interface Restaurant {
  id: string;
  title: string;
  description: string;
  score: 1 | 2 | 3 | 4 | 5;
  tag: Tag[];
  authorId: string;
}
