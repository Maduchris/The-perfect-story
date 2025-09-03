const cl = require('cloudinary').v2;
const config = require('./cloudinary-config');

cl.config(config);

cl.api.ping()
  .then(() => { console.log('OK'); })
  .catch((e) => {
    try {
      console.error('ERROR name:', e.name);
      console.error('ERROR message:', e.message);
      if (e.response) {
        console.error('ERROR status:', e.response.status);
        console.error('ERROR data:', JSON.stringify(e.response.data, null, 2));
      } else {
        console.error('ERROR object:', JSON.stringify(e, Object.getOwnPropertyNames(e), 2));
      }
    } catch (_) {
      console.error('ERROR (raw):', e);
    }
    process.exit(1);
  }); 