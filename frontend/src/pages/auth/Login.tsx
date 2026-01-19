import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  username: string;
  userRole: string;
  tokenType: string;
}

interface ErrorResponse {
  message: string;
}

function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userRole', data.userRole);
        setMessage('Login successful!');
      } else {
        const error: ErrorResponse = await response.json();
        setMessage(error.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-surface p-8 shadow-xl rounded-2xl border border-border">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Sign in to access your dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              required
              fullWidth
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              required
              fullWidth
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="primary"
            size="lg"
            disabled={loading}
            className="w-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </Button>

          {message && (
            <div className={`text-center p-3 rounded-lg text-sm font-medium ${message.includes('successful') ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {message}
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-text-muted">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
