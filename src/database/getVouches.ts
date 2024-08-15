import db from './database';

function getUsers() {
    try {
      const stmt = db.prepare('SELECT * FROM vouches');
      const vouches = stmt.all();

      console.log('Users:', vouches);
      
      return vouches;
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  }

  export default getUsers;