# README #

List Students Autoloader is a PowerSchool customization that allows the user to create, modify and delete List Students reports. Global List Students reports can also be created for commonly-used reports that all users can access. The report results page has also been modified to use Datatables to allow for data sorting, filtering

### Requirements ###
* Recent verisons of PowerSchool 7 are supported (>7.9), and PowerSchool 8.0 is also supported.
* CPM Plugins -- This customization uses the PowerSchool plugin package format for installation, so using a custom web_root is not recommended for use with this plugin.

### How do I get set up? ###
* Download the .zip plugin file.
* In PowerSchool Administrator, navigate to **System** -> **System Settings** -> **Plugin Management Configuration**
* Click **Install**
* Click **Browse**
* Navigate to the .zip plugin file and select it
* Enable the plugin by clicking the Enable checkbox for the List Students Autoloader entry
    * *ReportWorks* will need to be restarted after the plugin is enabled for the newly created database extensions to appear in *ReportWorks*.
* Navigate to */admin/studentlist/global_lists.html* to add global List Student reports that all users can access and use (but not modify or delete)

### Future goals ###
* Write tests
* Write help pages

### Who do I talk to? ###
* data@ironmail.org
* PowerSource