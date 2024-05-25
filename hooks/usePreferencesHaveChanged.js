import { useEffect, useState } from "react";

/**
 * A custom hook with logic to determine whether userPreferences have changed.
 */
export default function usePreferencesHaveChanged(userPreferences) {
  const [preferencesChanged, setPreferencesChanged] = useState(null);

  useEffect(() => {
    setPreferencesChanged(true);
  }, [userPreferences]);

  return [preferencesChanged];
}
