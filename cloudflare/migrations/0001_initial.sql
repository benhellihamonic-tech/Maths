CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY, name TEXT NOT NULL, grade TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'student', salt TEXT NOT NULL, password TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY, username TEXT NOT NULL REFERENCES users(username), expiry INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions(username);
CREATE INDEX IF NOT EXISTS sessions_expiry ON sessions(expiry);
CREATE TABLE IF NOT EXISTS progress (
  username TEXT NOT NULL REFERENCES users(username), lesson TEXT NOT NULL, mode TEXT NOT NULL,
  state TEXT NOT NULL, updated INTEGER NOT NULL, PRIMARY KEY(username,lesson,mode)
);
CREATE TABLE IF NOT EXISTS progress_history (
  username TEXT NOT NULL REFERENCES users(username), event TEXT NOT NULL, lesson TEXT NOT NULL,
  mode TEXT NOT NULL, state TEXT NOT NULL, updated INTEGER NOT NULL, PRIMARY KEY(username,event)
);
CREATE INDEX IF NOT EXISTS progress_completed ON progress_history(username,mode) WHERE json_extract(state,'$.done')=1;
CREATE TABLE IF NOT EXISTS auth_limits (
  key TEXT PRIMARY KEY, expiry INTEGER NOT NULL, attempts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS auth_limits_expiry ON auth_limits(expiry);
