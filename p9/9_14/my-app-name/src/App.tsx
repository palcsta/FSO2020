interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface Desc extends CoursePartBase {
  description?: string;
}
interface CoursePartBasic extends Desc {
  kind: "basic"
}
interface CoursePartSpec extends Desc {
  requirements: string[];
  kind: "special";
  
}
interface CoursePartGroup extends Desc {
  groupProjectCount: number;
  kind: "group"
}
interface CoursePartBackground extends Desc {
  backgroundMaterial: string;
  kind: "background"
}


type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpec;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
];
const courseName = "Half Stack application development";
const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

const App = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts}/>
      <Total total={totalExercises}/>
    </div>
  );
};
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ courses }: {courses:CoursePart[]}): JSX.Element => {
  
  return <>{courses.map(course => 
    {switch (course.kind) {      
      case "basic":
        return <p><b>{course.name} {course.exerciseCount}</b>
        
          <br/><i>{course.description}</i></p>;
      case "group":
        return <p><b>{course.name} {course.exerciseCount}</b><br/>project exercises {course.groupProjectCount}</p>;
      case "background":
        return <p><b>{course.name} {course.exerciseCount}</b><br/> {course.description}<br/>submit to: {course.backgroundMaterial}</p>;
      case "special":
        return <p><b>{course.name} {course.exerciseCount}</b><br/> {course.description}<br/>
        required skills: {course.requirements.map(x => x+", ")}</p>;
      default:
        return assertNever(course);}
    }
  )}</>;
};


const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>;
};

const Content = ({ courses }: {courses:CoursePart[]}): JSX.Element => {
  return (<Part courses={courses}/>);
};

const Total = ({ total }: { total: number }): JSX.Element => {
  return <p>Number of exercises {total}</p>;
};

export default App
