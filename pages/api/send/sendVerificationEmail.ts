export async function sendVerificationEmail(email: string) {
    const response = await fetch('/api/resend-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to send verification email');
    }
  
    return await response.json();
  }
  