import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string; // Keep as string for input handling
  firstName: string;
  lastName: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
  timestamp: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number must be 10 digits";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Exclude confirmPassword from the API payload and convert phoneNumber to number
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, phoneNumber, ...rest } = formData;

      const apiData = {
        ...rest,
        phoneNumber: parseInt(phoneNumber, 10) // Convert string to number (Long)
      };

      const response = await api.post<RegisterResponse>("/auth/register", apiData);

      if (response && (response.success || response.message)) {
        // Check for success flag if API returns standard wrapper, or just assume success if no error thrown
        setMessage(response.message || "Registration successful! You can now log in.");
      } else {
        setMessage("Registration failed (No message returned)");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 bg-surface p-8 shadow-xl rounded-2xl border border-border">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Join us to get started
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">

            {/* Row 1: First Name & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                label="First Name"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
                fullWidth
              />
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
                fullWidth
              />
            </div>

            {/* Row 2: Email */}
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              fullWidth
            />

            {/* Row 3: Phone Number */}
            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="1234567890"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              required
              fullWidth
            />

            {/* Row 4: Username */}
            <Input
              label="Username"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              required
              fullWidth
            />

            {/* Row 5: Password */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              fullWidth
            />

            {/* Row 6: Confirm Password */}
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              fullWidth
            />

          </div>

          <Button type="submit" fullWidth variant="primary" size="lg" disabled={loading} className="w-full shadow-md hover:shadow-lg transition-all duration-200">
            {loading ? "Registering..." : "Create Account"}
          </Button>

          {message && (
            <div
              className={`text-center p-3 rounded-lg text-sm font-medium ${message.includes("successful") ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                }`}
            >
              {message}
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
