import { useState } from "react";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <div>
        <input name="email" value={form.email} onChange={handleChange} />
        {form.email}
      </div>
      <p>-------------------</p>
    </>
  );
}

export default LoginForm;
