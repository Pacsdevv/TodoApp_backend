BEGIN;

CREATE INDEX IF NOT EXISTS idx_categories_user_id
ON categories(user_id);


ALTER TABLE categories
ADD CONSTRAINT categories_id_user_id_unique
UNIQUE (id, user_id);


ALTER TABLE todos
DROP CONSTRAINT IF EXISTS fk_todos_category;


ALTER TABLE todos
ADD CONSTRAINT fk_todos_category_user
FOREIGN KEY (category_id, user_id)
REFERENCES categories(id, user_id)
ON DELETE SET NULL;

COMMIT;
