import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";

export function useUser() {
  const query = useQuery(
    "user",
    async () => {
      try {
        return await fetchJson("/api/user");
      } catch (err) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000, // milliseconds
    }
  );
  return query.data;
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const mutation = useMutation(({ email, password }) =>
    fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  );
  return {
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
    signIn: async (email, password) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueriesData("user", user);
        return true;
      } catch (err) {
        return false;
      }
    },
  };
}
