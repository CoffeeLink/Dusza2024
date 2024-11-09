export type Language = {
  lang_name: string;
};

export type LanguageWithId = Language & {
  lang_id: number;
};

export type Category = {
  category_name: string;
  category_description: string;
  category_deadline: string;
  category_state: "open" | "closed";
};

export type CategoryWithId = Category & {
  category_id: number;
};
