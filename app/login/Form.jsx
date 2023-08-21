import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
      });

      setLoading(false);

      if (!res?.error) {
        console.log(res);
      } else {
        setError("Invalid email or password");
        setFormValues({ email: "", password: "" });
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={onSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="example@example.com"
            className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Your password"
            className="mt-1 px-3 py-2 w-full border rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
