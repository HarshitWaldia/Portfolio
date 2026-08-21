import { useState, useEffect } from "react";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface SessionData {
  user: SessionUser;
  session: {
    id: string;
    expiresAt: string;
    userId: string;
  };
}

type SessionListener = (data: SessionData | null) => void;
const listeners = new Set<SessionListener>();

function getStoredSession(): SessionData | null {
  try {
    const raw = localStorage.getItem("portfolio_session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredSession(session: SessionData | null) {
  if (session) {
    localStorage.setItem("portfolio_session", JSON.stringify(session));
  } else {
    localStorage.removeItem("portfolio_session");
  }
  listeners.forEach((listener) => listener(session));
}

export const authClient = {
  signIn: {
    social: async (options: { provider: string; callbackURL?: string }) => {
      // Simulate OAuth login by prompting the user for details, or just log in immediately as a mock user!
      // We'll prompt them with a nice standard default or let them login immediately
      const mockSession: SessionData = {
        user: {
          id: "mock-user-123",
          name: "GitHub Guest",
          email: "guest@github.com",
          image: null,
        },
        session: {
          id: "mock-session-123",
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          userId: "mock-user-123",
        },
      };
      setStoredSession(mockSession);
      if (options.callbackURL) {
        // If it's a client router redirect, we redirect. But since we use react-router-dom,
        // we can navigate, or simply let the window redirect or let the components handle it.
        // Let's do a simple page reload to the callback url.
        window.location.href = options.callbackURL;
      }
      return { data: mockSession, error: null };
    },
    custom: async (name: string) => {
      const mockSession: SessionData = {
        user: {
          id: `mock-user-${Date.now()}`,
          name: name || "Anonymous Guest",
          email: "guest@example.com",
          image: null,
        },
        session: {
          id: `mock-session-${Date.now()}`,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          userId: `mock-user-${Date.now()}`,
        },
      };
      setStoredSession(mockSession);
      return { data: mockSession, error: null };
    }
  },
  signOut: async () => {
    setStoredSession(null);
    return { error: null };
  },
  useSession: () => {
    const [session, setSession] = useState<SessionData | null>(getStoredSession());

    useEffect(() => {
      const listener = (newSession: SessionData | null) => setSession(newSession);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }, []);

    return {
      data: session,
      isPending: false,
      error: null,
      refetch: () => {
        setSession(getStoredSession());
      }
    };
  }
};

export const { signIn, signOut, useSession } = authClient;
