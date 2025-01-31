import axios from "axios";
import { getSession } from "./session";

const ProfilebaseUrl = process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL;
const baseUrl = process.env.NEXT_PUBLIC_GENERAL_BACKEND_URL;

export async function getProfile(userId: string) {
  try {
    const res = await axios.get(`${ProfilebaseUrl}/get_profile/${userId}`, {
      headers: {
        // Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
export async function getExams() {
  try {
    const res = await axios.get(`${baseUrl}/get_all_exams_no_filter`, {
      headers: {
        // Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getExamsStats(userId: string) {
  try {
    const res = await axios.get(`${baseUrl}/get_exam_stats/${userId}`, {
      headers: {
        // Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getExamsResult(userId: string) {
  try {
    const res = await axios.get(
      `${baseUrl}/get_exam_results_no_filter/${userId}`,
      {
        headers: {
          // Authorization: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getSingleExamResult(paramId: string) {
  const credentials = await getSession();
  const examResult = await getExamsResult(credentials?.id);

  const result = examResult?.data.find(
    (i: { examId: string }) => i.examId === paramId
  );

  return result;
}
