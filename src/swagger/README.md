## Swagger and API Info

The file 'swagger.ts' contains all the types that are used by 'api.ts' to generate the API controllers and actions.

If you make a backend change and want to test it:

1) Make the backend change
2) Start the server
3) Navigate to the swagger.json in browser ("{baseUrl}/swagger/v1/swagger.json", example "https://localhost:7230/swagger/v1/swagger.json")
4) Copy the whole json
5) Paste it here into the swagger.json, replacing the original json
6) In terminal/powershell, make sure you're in the 'app' folder (ex: C:\Users\ ... \repos\stray-safe-react-v1\app) and run 'npm run updateSwagger'
7) The new schema should generate automatically. Adjust 'api.ts' as needed.

will streamline this process as i add more automation and endpoints :D