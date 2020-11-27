Follow these steps to deploy this application on Azure App Service.

Pre-requisites: Install the following softwares
---------------
Node JS
NPM
Azure CLI
Git client
Command Line interface
Configure appSettings
Add the appSettings section to the configuration section of azure-webapp-maven-plugin. Change the values based on the application requirements.

Add the below configuration on the web.config file ( Create one if not available in the framework)
-----------------------------------------------------
<configuration>
  <system.webServer>
    
    <!-- indicates that the server.js file is a node.js application 
    to be handled by the iisnode module -->
    
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
    </handlers>
    
    <!-- adds server.js to the default document list to allow 
    URLs that only specify the application root location, 
    e.g. http://mysite.azurewebsites.com/ -->
    
    <defaultDocument enabled="true">
      <files>
        <add value="server.js" />
      </files>
    </defaultDocument>
      
      
  <rewrite>
      <rules>
        <rule name="Main Rule" stopProcessing="true">
                <match url=".*" />
                <conditions logicalGrouping="MatchAll">
                    <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                    <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                </conditions>
                <action type="Rewrite" url="/" />
            </rule>
        </rules>
    </rewrite>        
  </system.webServer>
</configuration>



Start the application on local system to verify the app is working:
-------------------------------------------------------------------
NPM Install
NPM start
Test the webapp by browsing to http://localhost:3001. Ensure the application works.

Unit testing procedure:
-----------------------
NPM test
Test Report : test-report.html availabe in the project folder

Logon to Azure:
--------------
Use az login to connect to the Azure subscription. Ensure you have contributor access on the Resource Group.

Deploy to Azure App Service
-----------------------------
Right click on the project name of the framework and click "deploy to web app"