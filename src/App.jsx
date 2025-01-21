// import Note from './components/Note'

// const App = ({ notes }) => {
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note => 
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//     </div>
//   )
// }

// export default App


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <ul>
        {courses.map( (course) => {
          return <Course key={course.id} course={course} />
        })}
      </ul>
    </div>
  )
}

export default App

const Course = (props) => {
  const {course} = props

  const total = course.parts.reduce( (s, p) => {
    return s + p.exercises
  }, 0)
  
  return (
    <div>
      <Header name={course.name}/>
      <ul>
        { course.parts.map( part => {
           return <Part key={part.id} name={part.name} exercises={part.exercises}/>
        })}
      </ul>
      <span> Total of </span>{total}<span> exercises</span>

    </div>
  )
}

const Header = (props) => {
  const {name} = props
  console.log('props in header', props)
  return (
    <h1>{name}</h1>
  )
}

const Part = (props) => {
  const { name, exercises} = props
  console.log('props in Part',props)
  return (
    <li>{name} {exercises}</li>
  )
}