export type UsernamePassword = {
  username: string;
  password: string;
};

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

export type SchoolRegistration = School & UsernamePassword;

type UserType = "TeamAccount" | "SchoolRepresentative" | "Organizer";

export type User<T extends UserType = UserType> = {
  username: string;
  user_type: T;
};

export type UserWithId<T extends UserType = UserType> = User<T> & {
  user_id: number;
};

export type TeamMember = {
  name: string;
  class: string;
};

export type Team = {
  team_name: string;
  school: SchoolWithId;
  members: TeamMember[];
  replacement_member: TeamMember | null;
  category: CategoryWithId;
  lang: LanguageWithId;
  sherpa_teachers: string[];
  team_approval_state:
    | "WaitingForApproval"
    | "ApprovedBySchoolRep"
    | "Approved";
};

export type TeamWithId = Team & {
  team_id: number;
};

export type TeamRegistration = Team & UsernamePassword;
