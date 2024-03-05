import { useEffect,useState } from 'react'
import './App.css'
import axios from 'axios';

enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

 type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

const baseUrl = 'http://localhost:3000/'

const createDiary = async (object: NewDiaryEntry) => {
  console.log(object)
  const { data } = await axios.post<DiaryEntry>(
    baseUrl+'api/diaries',
    object
  );

  return data;
};
const App = () => {
  const [diaries, setDiaries] = useState<NewDiaryEntry[]>([]) 
  const [date, setDate] = useState<string>("2021-01-01")
  const [weather, setWeather] = useState<Weather>(Weather.Windy)
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
  const [comment, setComment] = useState<string>("comment")  
 


  const diaryCreation = (event: React.SyntheticEvent) => {
    try{event.preventDefault()
    createDiary({ date: date,
      weather: weather,
      visibility: visibility,
      comment:comment}).then(data => {setDiaries(diaries.concat(data))}) // Add type assertion (!) to ensure data is not undefined
    }catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        // Do something with this error...
      } else {
        console.error(error);
      }
  }};
  

  useEffect(() => {
    axios.get(baseUrl+'api/diaries').then(response => {
      setDiaries(response.data as NewDiaryEntry[]) 
    })
  }, [])
  //create a error timer function that will clear the error after 10 seconds
  
  return (<>
    
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <div>
          <div>
            <label>
              Visibility:
              <input
                type="radio"
                value={Visibility.Great}
                checked={visibility === Visibility.Great}
                onChange={(event) => setVisibility(event.target.value as Visibility)}
              />
              Great
            </label>
            <label>
              <input
                type="radio"
                value={Visibility.Good}
                checked={visibility === Visibility.Good}
                onChange={(event) => setVisibility(event.target.value as Visibility)}
              />
              Good
            </label>
            <label>
              <input
                type="radio"
                value={Visibility.Ok}
                checked={visibility === Visibility.Ok}
                onChange={(event) => setVisibility(event.target.value as Visibility)}
              />
              Ok
            </label>
            <label>
              <input
                type="radio"
                value={Visibility.Poor}
                checked={visibility === Visibility.Poor}
                onChange={(event) => setVisibility(event.target.value as Visibility)}
              />
              Poor
            </label>
          </div>
          <div>
            <label>
              Weather:
              <input
                type="radio"
                value={Weather.Sunny}
                checked={weather === Weather.Sunny}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
              Sunny
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Rainy}
                checked={weather === Weather.Rainy}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
              Rainy
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Cloudy}
                checked={weather === Weather.Cloudy}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
              Cloudy
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Stormy}
                checked={weather === Weather.Stormy}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
              Stormy
            </label>
            <label>
              <input
                type="radio"
                value={Weather.Windy}
                checked={weather === Weather.Windy}
                onChange={(event) => setWeather(event.target.value as Weather)}
              />
              Windy
            </label>
          </div>
        </div>
        <input value={comment} onChange={(event) => setComment(event.target.value)}/>        
        <button onClick={diaryCreation}type='submit'>add</button>      
      
      
  <h2>Diaries:</h2>{diaries.map(x => <p><br/><b>{x.date}</b>
  <br/><>visibility: {x.visibility}</>
  <br/><>weather: {x.weather}</></p>)}
  
  
  </>)
}

export default App



//{ date: "01-01-2021",weather: "windy",visibility: "good",comment:"comment"}