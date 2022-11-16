const LOGIN =
  "SELECT (id) FROM users WHERE username = $1 AND password = crypt($2, password)";

const IS_EXIST_USERNAME = "SELECT COUNT(*) FROM users WHERE username = $1";

const SIGNUP =
  "INSERT INTO users (username, password) VALUES ($1, crypt($2, gen_salt('bf'))) RETURNING id";

const GET_NOTES =
  "SELECT * FROM notes WHERE user_id = $1 ORDER BY updated_at DESC LIMIT 100";

const CREATE_NOTE =
  "INSERT INTO notes (user_id, title, body, category) VALUES ($1, $2, $3, $4) RETURNING *";

const UPDATE_NOTE =
  "UPDATE notes SET title = $3, body = $4, category = $5, updated_at = NOW() WHERE id = $2 AND user_id = $1";

const DELETE_NOTE = "DELETE FROM notes WHERE id = $2 AND user_id = $1";

const GET_PROFILE = "SELECT (username) FROM users WHERE id = $1";

module.exports = {
  LOGIN,
  IS_EXIST_USERNAME,
  SIGNUP,
  GET_NOTES,
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  GET_PROFILE,
};
