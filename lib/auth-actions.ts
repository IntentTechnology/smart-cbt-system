"use server";

import { cookies } from "next/headers";

const AuthbaseUrl = process.env.NEXT_PUBLIC_AUTH_BACKEND_URL;
const ProfilebaseUrl = process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL;
const GenbaseUrl = process.env.NEXT_PUBLIC_GENERAL_BACKEND_URL;
export async function login(data: any) {
  const res = await fetch(`${AuthbaseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const credentials = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify(credentials.data), {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 3), // expires in 3 days
    path: "/",
    sameSite: "strict",
  });

  return credentials;
}

export async function Register(data: any) {
  const res = await fetch(`${AuthbaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  return response;
}

export async function sendOtp(data: any) {
  const res = await fetch(`${AuthbaseUrl}/send_otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  return response;
}

export async function createProfile(data: any) {
  const res = await fetch(`${ProfilebaseUrl}/create_profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  return response;
}

export async function setProfilePic(formData: FormData,userId:string) {
  const res = await fetch(`${ProfilebaseUrl}/set_profile_photo/${userId}`, {
    method: "POST",
    // headers: {
    //     "Content-Type": "application/json",
    // },
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

