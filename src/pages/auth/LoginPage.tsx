import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SoftBox from '../../components/ui/SoftBox';
import SoftTypography from '../../components/ui/SoftTypography';
import SoftInput from '../../components/ui/SoftInput';
import SoftButton from '../../components/ui/SoftButton';
import CoverLayout from '../../components/layout/CoverLayout';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // const handleSocialLogin = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
  //   try {
  //     const { error } = await signInWithProvider(provider);
  //     if (error) {
  //       setError(error.message);
  //     }
  //   } catch (err) {
  //     setError('An unexpected error occurred');
  //   }
  // };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    >

      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        {error && (
          <SoftBox mb={2} p={2} className="bg-error-50 border border-error-200 rounded-lg">
            <SoftTypography variant="caption" color="error">
              {error}
            </SoftTypography>
          </SoftBox>
        )}

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </SoftBox>

        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </SoftBox>

        <SoftBox display="flex" alignItems="center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleSetRememberMe}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            className="ml-2 cursor-pointer select-none"
          >
            Remember me
          </SoftTypography>
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton
            variant="gradient"
            color="info"
            fullWidth
            type="submit"
            disabled={loading || !email || !password}
          >
            {loading ? 'Signing in...' : 'sign in'}
          </SoftButton>
        </SoftBox>

        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{' '}
            <SoftTypography
              component={Link}
              to="/auth/register"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
};

export default LoginPage;
