// const fetcher = async (url: string, token: string) => {
//   const res = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify({
//       reaction_type_id: 1,
//       token: { token },
//     }),
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.json();
//   const parsedData = SinglePostSchema.safeParse(data);
//   if (!parsedData.success) {
//     parsedData.error.issues.map((issue) => {
//       console.error(`${issue.message} -- ON -- ${issue.path}`);
//     });
//   }
//   return parsedData.data?.data;
// };

// const usePostReaction = async (postId: number) => {};
