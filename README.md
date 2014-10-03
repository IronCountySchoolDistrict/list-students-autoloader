
# List Students Autoloader 

List Students Autoloader is a PowerSchool customization that allows users to create, modify and delete List Students reports. 
Global List Students reports can also be created for commonly-used reports that all users can access. 
The report results page has also been modified to use Datatables to allow for data sorting and filtering.

### Requirements ###
* Recent verisons of PowerSchool 7 are supported (>7.9), and PowerSchool 8.0 is also supported.
* CPM Plugins -- This customization uses the PowerSchool plugin package format for installation, so using a custom web_root is not recommended for use with this plugin.

### Install ###
* Download the .zip plugin file.
* In PowerSchool Administrator, navigate to **System** -> **System Settings** -> **Plugin Management Configuration**
* Click **Install**
* Click **Browse**
* Navigate to the .zip plugin file and select it
* Enable the plugin by clicking the Enable checkbox for the List Students Autoloader entry
    * *ReportWorks* will need to be restarted after the plugin is enabled for the newly created database extensions to appear in *ReportWorks*.
* Navigate to */admin/studentlist/global_lists.html* to add global List Student reports that all users can access and use (but not modify or delete)

### Usage ###
* Access the List Students page from the same location
* Global and User reports are selected from the drop-down menu on the right.
* Only User reports can be created, modified and deleted by the end user (admins can manage global lists).
* Fill in the report fields and click Save. Your report now appears in the report menu under User Lists with the title you entered in the Report Title text box.
* Clicking the Delete button will delete the currently selected report.

### Future goals ###
* Write tests
* Write PowerSchool help pages

### Where can I find help? ###
* data at ironmail dot org
* Make a thread on the Customizations forum on PowerSource

Thanks!
