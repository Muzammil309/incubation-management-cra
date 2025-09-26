import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SoftBox from '../../components/ui/SoftBox';
import SoftTypography from '../../components/ui/SoftTypography';
import SoftInput from '../../components/ui/SoftInput';
import SoftButton from '../../components/ui/SoftButton';
import SoftCard from '../../components/ui/SoftCard';
import BasicLayout from '../../components/layout/BasicLayout';
import Socials from '../../components/ui/Socials';
import Separator from '../../components/ui/Separator';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreement, setAgreement] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp, signInWithProvider } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!agreement) {
      setError('Please agree to the Terms and Conditions');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password, { full_name: name });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Account created. Please check your email to verify your address.');
        setTimeout(() => navigate('/auth/login'), 1500);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
    try {
      const { error } = await signInWithProvider(provider);
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const handleSetAgreement = () => setAgreement(!agreement);

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    >

      <SoftCard>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>

        <SoftBox mb={2}>
          <Socials
            onGoogleClick={() => handleSocialLogin('google')}
            onGithubClick={() => handleSocialLogin('github')}
            onLinkedInClick={() => handleSocialLogin('linkedin_oidc')}
          />
        </SoftBox>

        <Separator />

        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            {error && (
              <SoftBox mb={2} p={2} className="bg-error-50 border border-error-200 rounded-lg">
                <SoftTypography variant="caption" color="error">
                  {error}
                </SoftTypography>
              </SoftBox>
            )}
            {success && (
              <SoftBox mb={2} p={2} className="bg-success-50 border border-success-200 rounded-lg">
                <SoftTypography variant="caption" color="success">
                  {success}
                </SoftTypography>
              </SoftBox>
            )}

            <SoftBox mb={2}>
              <SoftInput
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </SoftBox>

            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </SoftBox>

            <SoftBox mb={2}>
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
                checked={agreement}
                onChange={handleSetAgreement}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgreement}
                className="ml-2 cursor-pointer select-none"
              >
                I agree the&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </SoftTypography>
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
                disabled={loading || !email || !password || !agreement}
              >
                {loading ? 'Creating account...' : 'sign up'}
              </SoftButton>
            </SoftBox>

            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/auth/login"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </SoftCard>
    </BasicLayout>
  );
};

export default SignUpPage;

