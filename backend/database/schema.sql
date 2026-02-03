CREATE DATABASE IF NOT EXISTS campusmart;
USE campusmart;

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PRODUCTS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  source VARCHAR(100),
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  video_url VARCHAR(255),
  status ENUM('pending', 'approved') DEFAULT 'pending',
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_products_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- ==============addressesaddresses===========
-- LOST & FOUND TABLE
-- =========================
CREATE TABLE IF NOT EXISTS lost_found (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  status ENUM('lost', 'found') NOT NULL,
  image VARCHAR(255),
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_lostfound_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE chats (
  id INT AUTO_INCREMENT PRIMARY KEY,

  item_id INT NOT NULL,         -- lost_found.id
  owner_id INT NOT NULL,        -- item owner
  finder_id INT NOT NULL,       -- person who clicked "I Found This"

  status ENUM('open', 'closed') DEFAULT 'open',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (item_id) REFERENCES lost_found(id),
  FOREIGN KEY (owner_id) REFERENCES users(id),
  FOREIGN KEY (finder_id) REFERENCES users(id),

  UNIQUE (item_id, finder_id)   -- ❗ prevents duplicate chats
);
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,

  chat_id INT NOT NULL,
  sender_id INT NOT NULL,

  message TEXT NULL,
  image VARCHAR(255) NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (chat_id) REFERENCES chats(id),
  FOREIGN KEY (sender_id) REFERENCES users(id)
);

