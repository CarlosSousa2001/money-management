import { useEffect, useState, useCallback } from "react";
import { UserProfileMeResponse } from "../types/user-schemas-types";
import { getProfile } from "../_api/get-me";
import { toast } from "sonner";

export function useGetUserDetails() {
    const [data, setData] = useState<UserProfileMeResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchUser = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const profile = await getProfile();
            console.log(profile.data)
            setData(profile);
            toast.success("User profile fetched successfully!");
        } catch (err) {
            setError(err as Error);
            toast.error("Failed to fetch user profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Chama no mount
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchUser,
    };
}
