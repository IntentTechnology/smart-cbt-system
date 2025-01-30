"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type Profile = {
  message: string;
  data: {
    id: string;
    userId: string;
    country: null;
    phoneNumber: null;
    profilePhotoUrl: undefined;
    createdAt: string;
    updatedAt: string;
    name: string;
  };
};

type Exams = {
  message: string;
  data: {
    id: string;
    subject: string;
    createdAt: string;
    duration: number;
  }[];
};

interface ProfileContextProps {
  profile: Profile | null;
  getAllExams: Exams | null;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export const ProfileProvider = ({
  children,
  profile,
  getAllExams,
}: {
  children: React.ReactNode;
  profile: Profile | null;
  getAllExams: Exams | null;
}) => {
  return (
    <ProfileContext.Provider value={{ profile, getAllExams }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextProps => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
