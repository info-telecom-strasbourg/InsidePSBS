export type EventType = {
  id: number;
  author: AuthorType;
  title: string;
  start_at: Date;
  end_at: Date;
  description: string;
  location: string;
  color: string;
};

export type AuthorType = {
  logo_url: string;
  short_name: string;
  name: string;
};
