"use client";
import FullPageLoader from "@/components/FullPageLoader";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Suspense,
} from "react";

type Profile = {
  message: string;
  data: {
    id: string;
    userId: string;
    country: null;
    phoneNumber: null;
    profilePhotoUrl: string | undefined
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
    length:number
  }[];
};

interface ProfileContextProps {
  profile: Profile | null;
  getAllExams: Exams | null;
  examResults: Exams | null;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export const ProfileProvider = ({
  children,
  profile,
  getAllExams,
  examResults,
}: {
  children: React.ReactNode;
  profile: Profile | null;
  getAllExams: Exams | null;
  examResults: Exams | null;
}) => {
  return (
    <div className="bg-[#FAFAFA] ">
      <Suspense fallback={<FullPageLoader />}>
        <ProfileContext.Provider  value={{ profile, getAllExams, examResults }}>
          {children}
        </ProfileContext.Provider>
      </Suspense>
    </div>
  );
};

export const useProfile = (): ProfileContextProps => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
