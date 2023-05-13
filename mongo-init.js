db.createUser({
  user: 'user',
  pwd: 'pw',
  roles: [
    {
      role: 'readWrite',
      db: 'db',
    },
  ],
});
