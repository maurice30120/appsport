module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f048eb7f50c3f3809fae8c19e2a26a43'),
  },
});
