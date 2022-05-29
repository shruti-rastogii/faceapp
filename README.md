# Getting Started

After cloning the application, run
### `npm i`
to install the dependencies

# Running the Application

To run the program, please execute
### `npm run start`

# In helpers.js: 

Please enter the Azure Face API key and endpoint that you have access to.

# In App.js: 

Please change the API Interval to a suitable value based on API call frequency allowed. The current valus is 3000 (ms). Lower values would be more suited and responsive.

# About

Currently, the application checks for underage drivers, drivers exhibiting anger or sadness, and drivers gazing to the left or right, as a warning for potential accidents. Eye occlusion is currently not returning the required response, as reported [here](https://social.msdn.microsoft.com/Forums/en-US/06e7af8f-58f0-423c-99bd-26ff65bc29d6/azure-face-api-eyes-occlusion-problems?forum=csharpgeneral), but the feature has been added nonetheless.

# Comments

I started this project on 23rd May, as a complete newcomer to Javascript and React, with only experience in HTML and CSS. From learning what a state is to performing API calls, I believe I have come a long way in this week.

I will continue adding features to this application during my summer break.
