## Track Satellites for &#119987; Minutes  
*A satellite tracking visualization web app.*  
### :link: [Project Demo URL](https://track-satellites-for-x-minutes.herokuapp.com/)  
### Introduction  
  ***Track Satellites for &#119987; Minutes*** is a personal project to demonstrate the knowledge and skills to design the layout and component interface and data flow, 
  and implement the API calls with [the Node.js back-end server](https://github.com/zacktcheng/node-js-server-for-n2yo) to utilize the data by calling N2YO APIs, and 
  finally provides end users visualized tracking data of selected satellites as a playable animation. The UI design for this project is built on top of Ant Design UI 
  components with my prefered color scheme and layout customization.  

### Overview
Please checkout the flow chart *(Coming soon)*.

### Features
- #### User-defined oberver information
   The app provides a simple UI of customizable geo inputs and satellite categores. It collects the entered information and turns it into a list of selectible satellites.  
- #### Playable satellite tracker animation on React-Simple-Maps
   The app takes the N2YO positions api response data, then uses React-Simple-Maps APIs animates the tracking data as marker(s) onto the world map.  

### Tech
- HTML
- CSS
- JavaScript
- ReactJs
- N2YO APIs
- Ant Design
- React Simple Maps