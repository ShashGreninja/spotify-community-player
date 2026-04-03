const auth0AI = new Auth0AI();

export const withSpotifyConnection = auth0AI.withTokenVault({
  connection: "spotify",
  scopes: [
    // Required scopes for Token Vault
    "user-read-private",
    // Optional Scopes specific for your app
    "user-read-email", 
  ],
  refreshToken: getAuth0RefreshToken(),
});