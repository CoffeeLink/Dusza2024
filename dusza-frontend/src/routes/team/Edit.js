export const Edit = () => {
    // const navigate = useNavigate();
    //
    // const [languages, setLanguages] = React.useState<string[]>([]);
    //
    // React.useEffect(() => {
    //   // axios.get("/api/languages").then((res) => {
    //   //   setLanguages(res.data);
    //   // });
    //
    //   setLanguages(["Language 1", "Language 2", "Language 3"]);
    // }, []);
    //
    // React.useEffect(() => {
    //   // axios.get("/api/categories").then((res) => {
    //   //   setCategories(res.data);
    //   // });
    //
    //   setCategories(["Category 1", "Category 2", "Category 3"]);
    // }, []);
    //
    // React.useEffect(() => {
    //   // axios.get("/api/schools").then((res) => {
    //   //   setSchools(res.data);
    //   // });
    //
    //   setSchools(["School 1", "School 2", "School 3"]);
    // }, []);
    //
    // const [fields, setFields] = React.useState({
    //   team_id: 1,
    //   team_name: "Team 1",
    //   schoolId: 1,
    //   members: [
    //     {
    //       name: "Member 1",
    //       class: "Class 1",
    //     },
    //     {
    //       name: "Member 2",
    //       class: "Class 2",
    //     },
    //   ],
    //   replacement_member: {
    //     name: "Replacement 1",
    //     class: "Class 1",
    //   },
    //   categoryId: 1,
    //   langId: 1,
    //   sherpa_teachers: ["Teacher 1", "Teacher 2"],
    //   team_approval_state: "WaitingForApproval",
    // });
    //
    // const onChange = (
    //   // fields keys
    //   fieldName: keyof typeof fields,
    //   value: (typeof fields)[keyof typeof fields],
    // ) => {
    //   setFields({
    //     ...fields,
    //     [fieldName]: value,
    //   });
    // };
    //
    // const onSubmit = () => {
    //   const newFields = { ...fields } as Optional<
    //     typeof fields,
    //     "replacement_member"
    //   >;
    //
    //   if (newFields.replacement_member === null) {
    //     delete newFields.replacement_member;
    //   }
    //
    //   axios.post("/api/team/edit", newFields).then((res) => {
    //     console.log(res.data);
    //     navigate("/team");
    //   });
    // };
    //
    // return (
    //   // <div className="w-full flex flex-col gap-2 items-center">
    //   //   <h1 className="text-center text-4xl w-fit">Edit team</h1>
    //   <MiddlePanel title="Edit team">
    //     <FormFactory
    //       configs={GetEditConfig(onChange, fields, { languages })}
    //       submit={{
    //         onSubmit,
    //         text: "Edit",
    //       }}
    //     />
    //   </MiddlePanel>
    return null;
};
