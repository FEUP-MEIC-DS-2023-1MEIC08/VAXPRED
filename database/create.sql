PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS User (
    user_id INTEGER AUTOINCREMENT,
    user_name TEXT NOTNULL,
    password TEXT NOTNULL,
    email TEXT NOTNULL,
    institution TEXT,
    PRIMARY KEY (user_id), 
    CHECK (length(password) >= 8)
);

CREATE TABLE IF NOT EXISTS Plugin (
    plugin_id INTEGER AUTOINCREMENT,
    plugin_name TEXT NOTNULL,
    version NUMBER NOTNULL,
    author TEXT NOTNULL,
    API TEXT NOTNULL,
    PRIMARY KEY (plugin_id)
);

CREATE TABLE IF NOT EXISTS Plugin_User_Association (
    asso_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER AUTOINCREMENT,
    plugin_id INTEGER NOTNULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (plugin_id) REFERENCES Plugin(plugin_id),
);