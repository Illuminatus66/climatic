# Climatic is built using React, Node.js, MongoDB and hosted on Netlify using serverless function.

## It has a visitor route that simply displays weather data for the selected location following a dbl-click event at your desired location.

## It has a separate route for authenticated users to be able to download weather data from past interactions. The file formats currently offered are .json, .txt, .csv or .xlsx format. The data is fetched by filtering based on the timestamps of the requests.

### Major dependencies include mapbox-gl, @mapbox/mapbox-gl-geocoder, mongoose, @reduxjs/toolkit, jsonwebtoken, bcryptjs, dotenv and axios

# Build (for hosting on Netlify)
## Clone the repository to your local machine. Source the API keys and relevant connection URLs mentioned in the .env.example file and simply host the React app to Netlify. Specify the functions folder in their website's UI so that you won't have to set CORS headers specifically. Specify all the environment variables in their UI too.
## If you choose to host the functions on AWS Lambda/EC2 or something of that nature, you will need to set CORS headers in both, the pre-flight stage as well as the response stage.