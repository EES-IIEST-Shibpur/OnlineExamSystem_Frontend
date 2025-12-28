import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/AxiosInstance";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data.token);
      navigate("/student/dashboard", { replace: true });
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          
          {/* Illustration (hidden on mobile) */}
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Login illustration"
              className="img-fluid"
            />
          </div>

          {/* Login Card */}
          <div className="col-md-8 col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="mb-4 text-center">Login</h3>

                {message && (
                  <div className="alert alert-danger" role="alert" aria-live="assertive">
                    {message}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                      <input type="checkbox" id="rememberMe" className="form-check-input" />
                      <label htmlFor="rememberMe" className="form-check-label">
                        Remember me
                      </label>
                    </div>

                    <Link to="/forgot-password" className="small">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <p className="text-center mt-3 mb-0">
                  Don’t have an account?{" "}
                  <Link to="/user/signup" className="fw-bold">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Login;