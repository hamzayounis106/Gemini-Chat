let sessions = [];

export const addSession = (uu_session_id) => {
  if (uu_session_id) {
    sessions.push({ uu_session_id, history: [] });
  }
};

export const getAllSessions = () => {
  return sessions;
};
