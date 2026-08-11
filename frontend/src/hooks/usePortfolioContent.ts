import { useEffect, useState } from "react";
import type { Content } from "../types/content";
import { fetchContent } from "../lib/api";
import { fallbackContent } from "../data/fallback-content";

interface State {
  content: Content;
  loading: boolean;
  offline: boolean;
}

export function usePortfolioContent(): State {
  const [state, setState] = useState<State>({
    content: fallbackContent,
    loading: true,
    offline: false,
  });

  useEffect(() => {
    let cancelled = false;

    fetchContent<Content>("/api/content")
      .then((content) => {
        if (!cancelled) setState({ content, loading: false, offline: false });
      })
      .catch(() => {
        if (!cancelled) setState({ content: fallbackContent, loading: false, offline: true });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
