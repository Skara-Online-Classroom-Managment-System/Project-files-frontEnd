import React from "react";
import FullPageLoader from "components/Spinner/Spinner.js";
export default function useFullPageLoader() {
  const [loading, setLoading] = React.useState(false);
  return [
    loading ? <FullPageLoader /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
}
