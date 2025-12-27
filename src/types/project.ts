export type ProjectCategory = 'פינוי בינוי' | 'הריסה ובנייה (38/2)' | 'חיזוק ותוספת (38/1)' | 'אחר';

export type ProjectStatus = 'בבדיקה' | 'בתכנון' | 'בביצוע' | 'הושלם' | 'לא ידוע';

export interface Project {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  address: string | null;
  category: ProjectCategory;
  status: ProjectStatus;
  apartments_before: number | null;
  apartments_after: number | null;
  short_description: string | null;
  raw_details_text: string | null;
  images: string[];
  external_link: string;
}





