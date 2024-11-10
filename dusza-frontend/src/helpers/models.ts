export type Language = {
  lang_name: string;
};

export type LanguageWithId = Language & {
  lang_id: number;
};

export type Category = {
  category_name: string;
  category_description: string | null;
  category_deadline: string;
  category_state: "open" | "closed";
};

export type CategoryWithId = Category & {
  category_id: number;
};

export type School = {
  school_name: string;
  school_address: string;
  school_rep_name: string;
  school_rep_email: string;
};

export type SchoolWithId = School & {
  school_id: number;
};

export type User = {
  username: string;
  user_type: "TeamAccount" | "SchoolRepresentative" | "Organizer";
};

export type UserWithId = User & {
  user_id: number;
};
