CREATE TABLE IF NOT EXISTS activities (
  username TEXT NOT NULL REFERENCES users(username),
  id TEXT NOT NULL,
  state TEXT NOT NULL,
  revision INTEGER NOT NULL CHECK (revision > 0),
  last_event TEXT NOT NULL,
  PRIMARY KEY (username, id)
);
CREATE TABLE IF NOT EXISTS activity_events (
  username TEXT NOT NULL,
  event TEXT NOT NULL,
  id TEXT NOT NULL,
  state TEXT,
  revision INTEGER NOT NULL,
  updated INTEGER NOT NULL,
  PRIMARY KEY (username, event),
  FOREIGN KEY (username, id) REFERENCES activities(username, id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS activity_completed ON activity_events (username, updated) WHERE state IS NOT NULL;
CREATE TABLE IF NOT EXISTS progress_revisions (
  username TEXT NOT NULL REFERENCES users(username),
  lesson TEXT NOT NULL,
  mode TEXT NOT NULL,
  revision INTEGER NOT NULL CHECK (revision > 0),
  last_event TEXT NOT NULL,
  PRIMARY KEY (username, lesson, mode)
);
CREATE TABLE IF NOT EXISTS class_focus (
  grade TEXT PRIMARY KEY,
  chapter TEXT NOT NULL
);
