const courseParts = [
  {
    name: "Fundamentals",
    exerciseCount: 10
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14
  }
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

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>;
};

interface ContentProps {
  courses: { name: string; exerciseCount: number; }[];
}
const Content = ({ courses }: ContentProps): JSX.Element => {
  return (<>
      <p>{courses[0].name} {courses[0].exerciseCount}</p>
      <p>{courses[1].name} {courses[1].exerciseCount}</p>
      <p>{courses[2].name} {courses[2].exerciseCount}</p>
          </>);
};

const Total = ({ total }: { total: number }): JSX.Element => {
  return <p>Number of exercises {total}</p>;
};

export default App
