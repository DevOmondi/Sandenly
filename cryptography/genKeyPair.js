const crypto = require("crypto");

function generateKeyPair() {
  const generatedKeyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    // encoding options for public key
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    // encoding options for private key
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });
  return {
    privateKey: generatedKeyPair.privateKey,
    publicKey: generatedKeyPair.publicKey,
  };
};

module.exports = generateKeyPair;