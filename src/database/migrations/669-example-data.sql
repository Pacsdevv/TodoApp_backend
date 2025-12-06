INSERT INTO users (name, email, password) VALUES
  ('Pobs Dev', 'pobs@gmail.com', '123'),
  ('Isaac Dev', 'isaac@gmail.com', '666'),
  ('Shamir Dev', 'shamir@gmail.com', '69420')
  ON CONFLICT (email) DO NOTHING;

INSERT INTO todos (title, description, completed, user_id) VALUES
  ('aprender docker', 'ahi vamos tilin', false, 1),
  ('integrar postgresql driver en express', 'quiero que el backend tenga conexion con la DB', false, 1)
  ON CONFLICT DO NOTHING;