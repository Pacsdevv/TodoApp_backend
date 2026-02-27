INSERT INTO users (name, email, password) VALUES
  ('Pobs Dev', 'pobs@gmail.com', 'pepito123'),
  ('Isaac Dev', 'isaac@gmail.com', 'pepito123'),
  ('Shamir Dev', 'shamir@gmail.com', 'pepito123')
  ON CONFLICT (email) DO NOTHING;

INSERT INTO categories (name, description, user_id) VALUES
  ('Work', '', 1),
  ('Home', '', 1),
  ('Hobby', '', 2)
  ON CONFLICT DO NOTHING;


INSERT INTO todos (title, description, completed, user_id, category_id) VALUES
  ('aprender docker', 'ahi vamos tilin', false, 1, 1),
  ('integrar postgresql driver en express', 'quiero que el backend tenga conexion con la DB', false, 1, 1),
  ('aprender a hacer backflips', '', false, 1)
  ON CONFLICT DO NOTHING;