WeatherTop1000 V2 Changelog
version 0.1.0
Initial version ported from glitch-template.
Introduce station-store model.
Allow stations to be added to this model.
List and display all stations in the model.

version 0.1.2
Introduce reading-store model.
Allow readings to be added to this model.
List and diplayed all readings in the model.
Added extra view partials to inhance UX i.e. logos and icons.
Added delete methods and buttons for station and readings objects.

version 0.1.3
Created a station-analytics.js file in util folder..
Added max and min methods to stationAnalytics class
Added a latestReadings class in util/latest-readings.js file.
Used LatestReadings class to display latest readings in dashboard-view and station-view
developed view format with Bulma.

version 0.1.4
Added reading-conversions.js to util folder.
Created a readingConversions class with a temperature conversion method, a decimal place 
adjuster method and a BFT conversion method that diplays weather type to descriptive text

version 0.1.5
Added Wind Direction field to add-reading form.
Created a wind direction bespoke method that converts wind degrees to text (compass metrics).
Added a latestReadings summmary to dashboard and station views. 
Added a windchill calculation method to readingConversions class.

version 0.1.6
Added user-store.js to model.
Added accounts.js to controllers.
Added signup, login submit forms and views along with new index page.

version 0.1.7
Added edit button to station-view.

version 0.1.8
Switched project over to VSCode IDE platform instead of Glitch.
New repository is now dermie83/weathertop1000-v2-glitch.
Added user profile edit view and new methods in accountsControll and userStore.

version 0.1.9
Added an API report page that connects to openweather platform.
Added graphs and maps to display latest weather trend forecast 
and station location from the generated API reading.
Added comments to code.
Updated CHANGELOG and README file.

Project completed.





