# Climatic: Weather Data Downloader

Climatic is a weather data application built using various technologies, including React, Node.js, MongoDB, and hosted on Netlify using serverless functions.

## Features
**For Visitor**: Simply displays weather data in an HTML table for locations selected via a double-click event. No download options enabled.

**For Authenticated User**: Download weather data filtered by the timestamps of past interactions. The various formats available are:
  - .json
  - .xlsx
  - .csv
  - .txt

## Dependencies
Climatic relies on some uncommon dependencies, including:
- [mapbox-gl](https://github.com/mapbox/mapbox-gl)
- [@mapbox/mapbox-gl-geocoder](https://github.com/mapbox/mapbox-gl-geocoder)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/)- Much more simpler than configuring redux stores in the traditional manner
- [exceljs](https://github.com/exceljs/exceljs)
- [react-csv](https://github.com/abdennour/react-csv)
- [react-datepicker](https://github.com/Hacker0x01/react-datepicker)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [Tomorrow.io's](https://docs.tomorrow.io/reference/post-timelines) Weather API

# Build Instructions (for hosting on Netlify)

Follow these steps to host Climatic on Netlify:

1. Clone the repository to your local machine.
2. Source the API keys and relevant connection URLs mentioned in the `.env.example` file.

3. **Hosting options**:
   - Host the entire app under the same domain name (Option 1):
     - Specify the functions folder in their website's UI.
     - Specify all the environment variables in their UI.

   - Host the SPA separate from the serverless functions (Option 2):
     - Set CORS headers in both pre-flight and response stages.
     - Specify all the environment variables in their UI.
     
4. Change the `src/api/index.js` file to reflect the domain name of your choice.

If you choose to host the serverless functions on AWS Lambda/EC2 or a similar platform, you will need to set CORS headers in both the pre-flight and the response stage (since the domain names will differ now).

With these steps, you can easily deploy Climatic and start using it to access weather data.
