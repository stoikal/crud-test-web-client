import { useState, SyntheticEvent, ChangeEvent } from "react";

export default function CreateUser () {
  const [form, setForm] = useState({
    namalengkap: '',
    username: '',
    password: '',
    status: '1'
  })

  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    
    fetch('http://localhost:5245/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or do any other necessary actions
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="max-w-screen-sm mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <input
          value={form.namalengkap}
          type="text"
          placeholder="Full Name"
          name="namalengkap"
          required
          className="border"
          onChange={handleChange}
        />
        <br/>

        <input
          value={form.username}
          type="text"
          placeholder="Username"
          name="username"
          required
          className="border"
          onChange={handleChange}
        />
        <br/>

        <input
          value={form.password}
          type="password"
          placeholder="Password"
          name="password"
          required
          className="border"
          onChange={handleChange}
        />
        <br/>
        
        <select
          value={form.status}
          name="status"
          onChange={handleChange}
        >
          <option value="1">active</option>
          <option value="0">inactive</option>
        </select>
        <br/>

        <button
          type="submit"
          disabled
          className="disabled"
        >
          submit
        </button>
      </form>
    </main>
  )
}