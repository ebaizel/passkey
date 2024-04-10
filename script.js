// JavaScript code to execute
function executeJavaScript() {
    alert('JavaScript executed!');
    const createCredentialOptions = {
  challenge: new Uint8Array([
    21, 31, 105 /* 29 more random bytes generated by the server */,
  ]),
  rp: {
    name: "Example CORP",
    id: "login.example.com",
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
  .create({ createCredentialOptions })
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

// Add event listener to button
document.getElementById('executeButton').addEventListener('click', executeJavaScript);

