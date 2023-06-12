import { useState, ChangeEvent, SyntheticEvent } from "react"
import { User } from "@/types/User"

type OnSubmit = (form: User) => void

type Props = {
  initialValue: User
  onSubmit: OnSubmit
  title: string
}


export default function UserForm ({ initialValue, onSubmit, title }: Props) {
  const [form, setForm] = useState({...initialValue})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    onSubmit(form)
  }


  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-6 text-lg font-bold uppercase">{title}</h2>
      <input
        value={form.name}
        type="text"
        name="name"
        placeholder="Full Name"
        required
        className="border mb-6 px-3 py-2 rounded"
        onChange={handleChange}
      /> 
      <br/>

      <input
        value={form.username}
        type="text"
        placeholder="Username"
        name="username"
        required
        className="border mb-6 px-3 py-2 rounded"
        onChange={handleChange}
      />
      <br/>

      <input
        value={form.password}
        type="password"
        placeholder="Password"
        name="password"
        required
        className="border mb-6 px-3 py-2 rounded"
        onChange={handleChange}
      />
      <br/>
      
      <select
        value={form.status}
        name="status"
        onChange={handleChange}
        className="border mb-6 px-3 py-2 rounded"
      >
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
      <br/>

      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-2 rounded mb-8"
      >
        submit
      </button>
    </form>
  )
}