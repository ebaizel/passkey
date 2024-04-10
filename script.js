// JavaScript code to execute
function createCredentials() {
    alert('Creating credentials v1');
    const createCredentialOptions = {
  challenge: new Uint8Array([
    21, 31, 105 /* 29 more random bytes generated by the server */,
  ]),
  rp: {
    name: "Example CORP",
    id: "ebaizel.github.io",
  },
  user: {
    id: new Uint8Array(16),
    name: "canand@example.com",
    displayName: "Carina Anand",
  },
  pubKeyCredParams: [
    {
      type: "public-key",
      alg: -7,
    },
  ],
};

navigator.credentials
  .create({ publicKey: createCredentialOptions })
  .then((newCredentialInfo) => {
    const response = newCredentialInfo.response;
    const clientExtensionsResults =
      newCredentialInfo.getClientExtensionResults();
      console.log(response);
  })
  .catch((err) => {
    console.error(err);
  });

}

function getCredentials() {
    console.log("getting credentials");
    const requestCredentialOptions = {
  challenge: new Uint8Array([
    /* bytes sent from the server */
  ]),
};

navigator.credentials
  .get({ requestCredentialOptions })
  .then((credentialInfoAssertion) => {
      console.log("credentialInfoAssertion is ", credentialInfoAssertion);
    // send assertion response back to the server
    // to proceed with the control of the credential
  })
  .catch((err) => {
    console.error(err);
  });

}

// Add event listener to button
document.getElementById('createCredentialsButton').addEventListener('click', createCredentials);
document.getElementById('getCredentialsButton').addEventListener('click', getCredentials);

