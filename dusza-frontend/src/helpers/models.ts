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
  category_state: "Open" | "Closed";
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

export type SchoolWithIdAndUser = SchoolWithId & {
  user: UserWithId<"SchoolRepresentative">;
};

export type SchoolRegistration = School & {
  username: string;
  password: string;
};

type UserType = "TeamAccount" | "SchoolRepresentative" | "Organizer";

export type User<T extends UserType = UserType> = {
  username: string;
  user_type: T;
};

export type UserWithId<T extends UserType = UserType> = User<T> & {
  user_id: number;
};
