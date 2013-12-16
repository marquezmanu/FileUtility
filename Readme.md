# Globant File Utility

## Author

- Manuel Marquez **(Maintainer)**

## Introduction

The File Utility is in charge to upload files. This proxy the [uploadify](www.uploadify.com) library and use, as reference, the api of the [uploadifive](http://www.uploadify.com/documentation/), but with some differences that it will be explained below.
Basically, it allows to address file upload features transparently to developers, interfacing differents libraries/tools.

## Implementation

1. Create an instance of File Utility: 'var fileupload = new fileUtility()'

2. Setup the options that follow your file uplaod needs: 
	var options = {url: 'server.php',
					buttonText: 'Browse',
				    ...}

3. Initialize fileUtility using an input type file and the options:
	fileupload.init($(input[type=file]), options)

4. Upload files!

## Configuration

- Setup the path of the uploadify.swf, in the contructor of the module fileUploadify.
- Use the jquery.uploadifive.js, jquery.uploadify.js and uploadify.swf attached in this repo.


## Features

File Utility follows the **uploadifive** [API format](http://www.uploadify.com/documentation/) (with same semantical meaning, but proxied by our code), below there are File Utility API this is what you have to follow for a correct functionality.

Please read all the documentation for a correct use of it.

The integration and use of different libraries allows to:
- Manage HTML5 browser-enable recognition automatically (that allows to use uploadifive fopr full features)
- Flash version integration for non-HTML5 browsers (IE9 and below)
- Progress indicators (even on IE9)
- Drag&Drop files
- File cancellation

Coming soon...
- File upload stop 
- File upload debug
- Multiple file uploads

## Options

### url 

- **Input Type**: String
- **Required**: Yes

The path to the script that will process the uploaded file. 

### auto 

- **Input Type**: Boolean
- **Default Value**: true

If set to true, files will automatically upload when added to the queue.

### buttonText 

- **Input Type**: String
- **Default Value**: 'SELECT FILES'

The text to display inside the browse button.  This text is rendered as HTML and may contain tags or HTML entities.

### checkScript

- **Input Type**: String
- **Default Value**: false

The path to the server-side files that checks whether a files with the same name as that being uploaded exists in the destination folder.  If the file does not exist, this script should return 0.  If the files does exist, the script should return 1.

### dnd

- **Input Type**: Boolean
- **Default Value**: true

If set to false, drag and drop capabilities will not be enabled.

### fileObjName

- **Input Type**: String
- **Default Value**: 'Filedata'

The name of the file object to use in your server-side script.  For example, in PHP, if this option is set to ‘the_files’, you can access the files that have been uploaded using $_FILES['the_files'];

### fileSizeLimit

- **Input Type**: String

The maximum upload size allowed in KB.  This option also accepts a unit.  If using a unit, the value must begin with a number and end in either KB, MB, or GB.  Set this option to 0 for no limit.

### fileType

- **Input Type**: String
- **Default Value**: false

The type of files allowed for upload.  This is taken from the file’s mime type.  To allow all images, set this option to ‘image’.  To allow a specific type of image, set this option to ‘image/png’.  To allow all images, set this value to false.  This option will also accept a JSON array to allow a specific set of fileTypes.

### formData

- **Input Type**: JSON Object
- **Default Value**: Empty Object

A JSON object containing additional data to send to the server-side upload script.  Data sent via this option will be sent via the headers and can be accessed via the $_POST array (if using the ‘post’ method).  So if you send something like {‘someKey’ : ‘someValue’}, then you can access it as $_POST['someKey'].

### height

- **Input Type**: Number
- **Default Value**: 30

The height of the browse button in pixels.

### itemTemplate

- **Input Type**: String
- **Default Value**: [HTML String]

The itemTemplate option allows you to specify a special HTML template for each item that is added to the queue.

The outtermost item element MUST have the class “uploadifive-queue-item” as the code uses this class to perform various tasks.

In UploadiFive, the following classes have special behavior in the queue item template:

.filename – The file name will be inserted in this element
.close – Cancel / close behavior will be added to the onClick for this element
.fileinfo – Upload status or percentage will display in this element
.progress-bar – This element’s width will be updated on upload progress

### method

- **Input Type**: String
- **Default Value**: 'post'

The type of method to use when submitting the form.  If set to ’get’, the formData values are sent via the querystring.  If set to ‘post’, the fromData values are sent via the headers.

### multi

- **Input Type**: Boolean
- **Default Value**: true

Whether or not to allow multiple file selection in the browse dialog window.  Setting to true will allow multiple file selection.  This does not affect the amount of files that can be added tot he queue.  To limit the queue size to 1, use the queueSizeLimit option.

### overrideEvents

- **Input Type**: JSON Array
- **Default Value**: Empty Array

An array of event names to override the default scripts of.  Check the details of each event to see whether it can be overridden.

### queueID

- **Input Type**: String
- **Default Value**: false

The ID of the element you want to use as a file queue.  This element will also act as the drop target for files if dnd is set to true.  If the value is set to false, a queue will be created and an ID will be assigned to it.

### queueSizeLimit

- **Input Type**: Number

The maximum number of files you can have in the queue at one time.  This does not affect the amount of files that may be uploaded.  To set the amount of files you may upload, use the uploadLimit option.  Set to 0 to set the limit to unlimited.

### removeCompleted

- **Input Type**: Boolean
- **Default Value**: false

Whether or not to remove items that have completed uploading from the queue.

### simUploadLimit

- **Input Type**: Number

The number of files that can be simultaneously uploaded at any given time.  Set to 0 to remove the limit.

### truncateLength

- **Input Type**: Number

The number of characters at which to truncate the file name in the queue.  Set to 0 to never truncate.

### uploadLimit

- **Input Type**: Number

The maximum number of files that may be uploaded.  Set to 0 to remove any limit.  This does not affect the number of files that may be added to the queue.  For that, use the queueSizeLimit option.

### width

- **Input Type**: Number
- **Default Value**: 100

The width of the browse button in pixels.

## Events

### onAdd

- **Input Type**: function
- **Overridable**: N/A

Triggered when a new item is added to the queue.  This is triggered whether or not the file item returns an error.

#### Arguments

- **file**: The file object being added to the queue.

---

### onCancel

- **Input Type**: function
- **Overridable**: N/A

Triggered when a file is cancelled / removed from the queue.

#### Arguments

- **file**: The file object being cancelled.

---

### onCheck

- **Input Type**: function
- **Overridable**: N/A

Triggered after a file is checked against existing files in the destination folder.  Only triggered if the onCheck option is not set to false.

#### Arguments

- **file**: The file object being checked.
- **fileExists**: (true or false) Whether or not the file name exists in the destination folder.

---

### onClearQueue

- **Input Type**: function

Triggered when the queue is cleared using the ‘clearQueue‘ method.

#### Arguments

- **queue**: The jQuerified DOM element of the file queue.

---

### onDestroy

- **Input Type**: function

Triggered when the UploadiFive instance is destroyed using the destroy method.

#### Arguments

No arguments are passed to this event.

---

### onDrop

- **Input Type**: function

Triggered when a file is dropped onto the file queue.

#### Arguments

- **file**: An object containing the file objects dropped onto the file queue.
- **fileDropCount**: The number of files dropped onto the queue.

---

### onError

- **Input Type**: function
- **Overridable**: N/A

Triggered when an error occurs either adding a file to the queue or uploading a file.

#### Arguments

- **errorType**: One of several types of error codes including: QUEUE_LIMIT_EXCEEDED, UPLOAD_LIMIT_EXCEEDED, FILE_SIZE_LIMIT_EXCEEDED, FORBIDDEN_FILE_TYPE, and 404_FILE_NOT_FOUND.
- **file / filesToUpload**: Depending on the error code, the second argument will hold either a null value, the file object being uploaded (FILE_SIZE_LIMIT_EXCEEDED, FORBIDDEN_FILE_TYPE, 404_FILE_NOT_FOUND) or a collection of files that need to be uploaded (UPLOAD_LIMIT_EXCEEDED).

---

### onInit

- **Input Type**: function

Triggered at the end of the initialization phase.

#### Arguments

No arguments are passed to this event.

---

### onProgress

- **Input Type**: function
- **Overridable**: N/A

Triggered every time a file upload has a progress update.

#### Arguments

- **file**: The file being uploaded.
- **bytesUploaded**: The number of bytes of the file that have been uploaded.
- **bytesTotal**: The total number of bytes of the file.

---

### onQueueComplete **( not yet implemented)**

- **Input Type**: function

Triggered when all files in the queue have completed uploading.

#### Arguments

- **(not yet implemented)**

---

### onSelect **(not yet implemented)**

- **Input Type**: function

Triggered once for every file that is selected whether it returns and error or not.

#### Arguments

- **(not yet implemented)**

---

### onUploadComplete

- **Input Type**: function
- **Overridable**: N/A

Triggered once for each file upload that completes.

#### Arguments

- **file**: The file object that was uploaded.
- **data**: The data returned from the server-side upload script.

---

### onUploadFile

- **Input Type**: function
- **Overridable**: N/A

Triggered once for every file upload that starts.

#### Arguments

- **file**: The file object being uploaded. 

## Methods

### init

Initialize File Utility

#### Arguments

- **input**: The input type file. 
- **options**: The object containing all the options a events.

---

### upload

Upload the last file selected

#### Arguments

No arguments are passed to this method.

---

### cancel

Cancel the selected file or all the files (if pass non arguments).

#### Arguments

- **fileId**: File object to be canceled, if there are not arguments this will cancel all the files in the queue.

---

### settings

Set an option with some data during runtime

#### Arguments

- **option**: Option to be set.
- **data**: Data that will configure the option.

## Styling

### Input Styling

For a correct cross browsing styling, wrap the input type file between span and put the css on the span.
For example:

	<span class="btn btn-success">
		<input id="fileupload" type="file"/>
	<span>

In this example I used bootstrap classes

### Queue 

If you don't want to see the queue that is a default behavior of this library put this in your css:

	.uploadifive-queue, .uploadify-queue {
		display: none
	}

---

## Notes

Yet FileUtility it is not finished, so you can contribute in this project sending a pull request. 

Enjoy!





