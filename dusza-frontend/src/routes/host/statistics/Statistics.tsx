import { MiddlePanel } from "../../../components/middle/MiddlePanel.tsx";
import {
  AcademicCapIcon,
  CodeBracketIcon,
  Squares2X2Icon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const Statistics = () => {

    type BadgeStatistics = {
        key: string;
        title: string;
        value: number;
        icon: React.ElementType;
        color?: string;
    };

    const datas: BadgeStatistics[] = [
        {
            key: "category",
            title: "kategória",
            value: 3,
            icon: Squares2X2Icon,
        },
        {
            key: "language",
            title: "programozási nyelv",
            value: 2,
            icon: CodeBracketIcon,
        },
        {
            key: "school",
            title: "iskola",
            value: 5,
            icon: AcademicCapIcon,
        },
        {
            key: "team",
            title: "csapat",
            value: 12,
            icon: UserGroupIcon,
        },
        {
            key: "accepted",
            title: "jóváhagyott",
            value: 2,
            icon: CheckCircleIcon,
            color: "bg-green-700"
        },
        {
            key: "pending",
            title: "jóváhagyásra vár",
            value: 2,
            icon: ClockIcon,
            color: "bg-yellow-700"
        },
        {
            key: "toFix",
            title: "javítandó",
            value: 2,
            icon: ExclamationCircleIcon,
            color: "bg-red-700"
        },

    ];

    type School = {
        id: number;
        name: string;
    };

    const schools: School[] = [
        {
            id: 1,
            name: "Iskola 1",
        },
        {
            id: 2,
            name: "Iskola 2",
        },
        {
            id: 3,
            name: "Iskola 3",
        },
        {
            id: 4,
            name: "Iskola 4",
        },
        {
            id: 5,
            name: "Iskola 5",
        },
    ];

    type Team = {
        id: number;
        name: string;
        schoolId: number;
        registrationDate: Date;
    };

    const teams: Team[] = [
        {
            id: 1,
            name: "Csapat 1",
            schoolId: 1,
            registrationDate: new Date(2023, 0, 15), 
        },
        {
            id: 2,
            name: "Csapat 2",
            schoolId: 1,
            registrationDate: new Date(2023, 0, 20), 
        },
        {
            id: 3,
            name: "Csapat 3",
            schoolId: 1,
            registrationDate: new Date(2023, 1, 10), 
        },
        {
            id: 4,
            name: "Csapat 4",
            schoolId: 2,
            registrationDate: new Date(2023, 1, 15),
        },
        {
            id: 5,
            name: "Csapat 5",
            schoolId: 2,
            registrationDate: new Date(2023, 2, 5), 
        },
        {
            id: 6,
            name: "Csapat 6",
            schoolId: 2,
            registrationDate: new Date(2023, 2, 10), 
        },
        {
            id: 7,
            name: "Csapat 7",
            schoolId: 3,
            registrationDate: new Date(2023, 3, 25), 
        },
        {
            id: 8,
            name: "Csapat 8",
            schoolId: 3,
            registrationDate: new Date(2023, 3, 30),
        },
        {
            id: 9,
            name: "Csapat 9",
            schoolId: 3,
            registrationDate: new Date(2023, 4, 5), 
        },
        {
            id: 10,
            name: "Csapat 10",
            schoolId: 4,
            registrationDate: new Date(2023, 4, 10), 
        },
        {
            id: 11,
            name: "Csapat 11",
            schoolId: 4,
            registrationDate: new Date(2023, 4, 15), 
        },
        {
            id: 12,
            name: "Csapat 12",
            schoolId: 5,
            registrationDate: new Date(2023, 4, 20),
        },
    ];


    const teamsPerSchool = schools.map((school) => {
        return {
          school: school.name,
          count: teams.filter((team) => team.schoolId === school.id).length,
        };
      });
    
      const chartDataSchools = {
        labels: teamsPerSchool.map((data) => data.school),
        datasets: [
          {
            label: 'Jelentkezett csapatok száma',
            data: teamsPerSchool.map((data) => data.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
      const teamsPerMonth = Array(12).fill(0);
    
      teams.forEach((team) => {
        teamsPerMonth[team.registrationDate.getMonth()]++;
      });
    

    
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
      };


    return (
        <MiddlePanel title="Statisztikák">
            <div className="flex gap-4 flex-wrap justify-start pt-4 pb-8">
                <div className="text-xl font-bold flex items-center">Portálszintű statisztikák:</div>
                {datas.slice(0, 4).map((data, index) => (
                    <div key={index} className="flex items-center gap-2 badge badge-neutral p-4">
                        <data.icon className="h-6 w-6" />
                        <div>
                            <p className="font-bold">{data.value} {data.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 flex-wrap justify-start pb-8">
            <div className="text-xl font-bold flex items-center">Csapatok állapota:</div>
                {datas.slice(4).map((data, index) => (
                    <div key={index} className={`flex items-center gap-2 badge badge-neutral p-4 ${data.color || ''}`}>

                        <data.icon className="h-6 w-6" />
                        <div>
                            <p className="font-bold">{data.value} {data.title}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 flex-wrap justify-start pb-8 w-full ">
    <table className="min-w-full">
        <thead>
            <tr>
                <th className="py-2 text-left">Jelentkezett csapatok száma iskolánként</th>
                <th className="py-2 text-left">Jelentkezett csapatok száma hónapokra lebontva</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="py-2 w-1/2">
                    <Bar data={chartDataSchools} options={chartOptions} />
                </td>
                <td className="py-2 w-1/2">
                    <Bar
                        data={{
                            labels: months.filter((_, index) => teamsPerMonth[index] > 0),
                            datasets: [
                                {
                                    label: 'Jelentkezett csapatok száma',
                                    data: teamsPerMonth.filter(count => count > 0),
                                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                    borderColor: 'rgba(153, 102, 255, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={chartOptions}
                    />
                </td>
            </tr>
        </tbody>
    </table>
</div>

       

    </MiddlePanel>
    );
};
