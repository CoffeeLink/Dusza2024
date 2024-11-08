import React from 'react'

export const Registration = () => {
  // username, password, 3x name and class, extra name and class, teachers name, programming language from dropdown
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name1, setName1] = React.useState('')
  const [name2, setName2] = React.useState('')
  const [name3, setName3] = React.useState('')
  const [class1, setClass1] = React.useState('')
  const [class2, setClass2] = React.useState('')
  const [class3, setClass3] = React.useState('')
  const [extraName, setExtraName] = React.useState('')
  const [extraClass, setExtraClass] = React.useState('')
  const [teacher, setTeacher] = React.useState('')
  const [language, setLanguage] = React.useState('')
  const [languages, setLanguages] = React.useState(['Python', 'Java', 'C++', 'JavaScript'])

  return (
    <div>
      <h1>Registration</h1>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Name 1:
          <input type="text" value={name1} onChange={(e) => setName1(e.target.value)} />
        </label>
        <label>
          Class 1:
          <input type="text" value={class1} onChange={(e) => setClass1(e.target.value)} />
        </label>
        <label>
          Name 2:
          <input type="text" value={name2} onChange={(e) => setName2(e.target.value)} />
        </label>
        <label>
          Class 2:
          <input type="text" value={class2} onChange={(e) => setClass2(e.target.value)} />
        </label>
        <label>
          Name 3:
          <input type="text" value={name3} onChange={(e) => setName3(e.target.value)} />
        </label>
        <label>
          Class 3:
          <input type="text" value={class3} onChange={(e) => setClass3(e.target.value)} />
        </label>
        <label>
          Extra name:
          <input type="text" value={extraName} onChange={(e) => setExtraName(e.target.value)} />
        </label>
        <label>
          Extra class:
          <input type="text" value={extraClass} onChange={(e) => setExtraClass(e.target.value)} />
        </label>
        <label>
          Teacher:
          <input type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
        </label>
        <label>
          Programming language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
