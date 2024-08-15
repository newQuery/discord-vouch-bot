import db from './database';

function addVouch(user_id: string, message: string, rating: number) {
  try {
    const stmt = db.prepare('INSERT INTO vouches (user_id, message, rating) VALUES (?, ?, ?)');
    const result = stmt.run(user_id, message, rating);
    console.log('User added:', result.lastInsertRowid);
  } catch (error: any) {
    console.error('Error adding user:', error.message);
  }
}

export default addVouch;