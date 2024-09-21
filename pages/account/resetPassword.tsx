import React, { useState } from 'react';
import Button from "@/components/UI/Button";
import { sendResetPassRequest } from "@/utils/api-calls";

export default function ForgotPassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const params = new URL(document.location.toString()).searchParams;

  const resetPass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    const newValues: Record<string, string> = { 
      id: params.get("id") || "", 
      token: params.get("token") || "", 
      newPass: password
    };

    try {
      await sendResetPassRequest(newValues);
    } catch (error) {
      console.error('Error:', error); // Handle any errors
      throw error;
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  }

  return (
    <section className="mx-container mb-section mt-14 lg:mt-20">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 3xs:text-4xl sm:text-5xl lg:text-6xl">
          Reset Password
        </h1>
        <div className="mb-6 text-center text-gray-600">
          <p>ID: {params.get("id")}</p>
          <p>Token: {params.get("token")}</p>
        </div>
        <form onSubmit={resetPass} className="mx-auto max-w-md">
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
            <div className="h-5 mt-1">
              {!passwordsMatch && (
                <p className="text-sm text-red-600">Passwords do not match.</p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            hierarchy="primary"
            font="font-bold"
            text="lg:text-lg"
            padding="py-3 px-6"
            rounded="rounded-lg"
            classes="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </section>
  );
}