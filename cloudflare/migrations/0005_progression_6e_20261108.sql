-- Avancement de 6e communiqué le 8 novembre 2026.
INSERT OR IGNORE INTO class_chapters (grade, chapter) VALUES
  ('6e', 'entiers'),
  ('6e', 'premiers-elements'),
  ('6e', 'fractions-partage'),
  ('6e', 'constructions');

DELETE FROM class_chapters WHERE grade = '6e' AND chapter = 'decimaux';

INSERT INTO class_focus (grade, chapter) VALUES ('6e', 'decimaux')
  ON CONFLICT(grade) DO UPDATE SET chapter = excluded.chapter;
