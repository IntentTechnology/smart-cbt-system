const ProfilebaseUrl = process.env.NEXT_PUBLIC_PROFILE_BACKEND_URL;
const baseUrl = process.env.NEXT_PUBLIC_GENERAL_BACKEND_URL;

export async function getProfile(userId: string) {
  const res = await fetch(`${ProfilebaseUrl}/get_profile/${userId}`, {
    headers: {
      //   Authorization: token,
    },
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getExams() {
  const res = await fetch(`${baseUrl}/get_all_exams_no_filter`, {
    headers: {
      //   Authorization: token,
    },
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getExamsStats(userId: string) {
  const res = await fetch(`${baseUrl}/get_exam_stats/${userId}`, {
    headers: {
      //   Authorization: token,
    },
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getExamsResult(userId: string) {
  const res = await fetch(`${baseUrl}}/get_exam_results_no_filter/${userId}`, {
    next: {
      revalidate: 0,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
