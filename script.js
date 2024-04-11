const userId = new Uint8Array(2);
userId[0] = 42;

// Pass in the relying party 'rp'
function createCredentials(rp) {
  console.log("creating credentials with rp of ", rp);
  const createCredentialOptions = {
    challenge: new Uint8Array([
      21, 31, 105 /* 29 more random bytes generated by the server */,
    ]),
    rp,
    user: {
      // id: new Uint8Array(16),
      id: userId,
      name: "canand@example.com",
      displayName: "Carina Anand",
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7,
      },
    ],
    authenticatorSelection: {
      userVerification: 'required',
      authenticatorAttachment: 'platform',
    },
  };

  navigator.credentials
    .create({ publicKey: createCredentialOptions })
    .then(async (newCredentialInfo) => {
      console.log("newCredentialInfo.rawId is ", newCredentialInfo.rawId);
      const blob = new Blob([newCredentialInfo.rawId], {type: 'text/plain; charset=utf-8'});
      let rawId = await blob.text();
      console.log("rawId from credential creation is ", rawId);
      
      const response = newCredentialInfo.response;
      const clientExtensionsResults =
        newCredentialInfo.getClientExtensionResults();
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Pass in the relying party 'rp'
function getCredentials(rp) {
  console.log("Getting credentials with rp ", rp);
  const requestCredentialOptions = {
    allowCredentials: [{
      id: userId,
      type: "public-key",
      transports: ["internal"]
    }],
    // rpId: rp === undefined ? null : rp.id,
    challenge: new Uint8Array([
      // must be a cryptographically random number sent from a server
      0x79, 0x50, 0x68, 0x71, 0xda, 0xee, 0xee, 0xb9, 0x94, 0xc3, 0xc2, 0x15,
      0x67, 0x65, 0x26, 0x22, 0xe3, 0xf3, 0xab, 0x3b, 0x78, 0x2e, 0xd5, 0x6f,
      0x81, 0x26, 0xe2, 0xa6, 0x01, 0x7d, 0x74, 0x50,
    ]).buffer,
  };

  navigator.credentials
    .get({ publicKey: requestCredentialOptions })
    .then(async (credentialInfoAssertion) => {
      console.log("credentialInfoAssertion is ", credentialInfoAssertion);
      const blob = new Blob([credentialInfoAssertion.rawId], {type: 'text/plain; charset=utf-8'});
      let rawId = await blob.text();
      console.log("rawId from getCredentials is ", rawId);
      // send assertion response back to the server
      // to proceed with the control of the credential
    })
    .catch((err) => {
      console.error(err);
    });
}

// Add event listener to button
document
  .getElementById("createCredentialsButton")
  .addEventListener("click", function () {
    createCredentials({
      name: "Example CORP",
      id: "ebaizel.github.io",
    })
  });
document
  .getElementById("getCredentialsButton")
  .addEventListener("click", function () {
    getCredentials({
      name: "Example CORP",
      id: "ebaizel.github.io",
    })
  });
document
  .getElementById("createCredentialsRandomRPButton")
  .addEventListener("click", function () {
    createCredentials({
      name: "Example CORP",
      id: "shady.domain.co"
    })
  });
document
  .getElementById("getCredentialsRandomRPButton")
  .addEventListener("click", function () {
    getCredentials({
      name: "Example CORP",
      id: "shady.domain.co"
    })
  });
// document
//   .getElementById("createCredentialsShadyRPButton")
//   .addEventListener("click", function () {
//     createCredentials({
//       name: "Example CORP",
//     })
//   });
// document
//   .getElementById("getCredentialsShadyRPButton")
//   .addEventListener("click", function () {
//     getCredentials({
//       name: "Example CORP",
//     })
//   });
