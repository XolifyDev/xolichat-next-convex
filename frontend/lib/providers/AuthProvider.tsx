"use client";

import React, { useEffect } from 'react'
import { cookies as Cookies } from "next/headers"
import { useAppStore } from '../stores/store';
import { COOKIE_NAME } from '../constants';

const AuthProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const { setUser } = useAppStore();

  useEffect(() => {
    const intervalId = setInterval(async () => {
        const r = await fetch("/api/auth/me");
        const response = await r.json();
        console.log(response);
        setUser(response.user);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <div className='AuthProvider'>{children}</div>
  )
}

export default AuthProvider