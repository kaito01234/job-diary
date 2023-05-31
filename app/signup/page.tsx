'use client';

import { getSession, signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default async function SignUp() {
  const session = await getSession();
  if (session?.user?.email) redirect('/home');

  const [email, setEmail] = useState('');
  const [signuped, setSignuped] = useState(false);

  const onSignup = async () => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (res.status == 200) {
      setSignuped(true);
    } else {
      alert('error signup');
    }
  };

  return signuped ? (
    <>
      <h2>Success Signup</h2>
      <button onClick={() => signIn()}>Re Signin</button>
    </>
  ) : (
    <>
      <h2>Signup</h2>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <button onClick={onSignup}>Signup</button>
    </>
  );
}
