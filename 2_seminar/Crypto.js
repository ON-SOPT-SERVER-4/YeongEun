const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString
}) 