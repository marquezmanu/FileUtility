/**
 * Proxy uploadifive
 */
(function(root, callback) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('fileUtility/uploadifive',
      function() {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return callback();
      });
  } else {
    /** Browser globals */
    return root.fileUploadifive = callback();
  }

})(this, function() {
  /**
   * @class fileUploadifive
   * @constructor
   */
  var fileUploadifive = function() {
    this.options = {
      'uploadScript': ''
    };
    this.isHTML5 = true;
    return this;
  };
  /**
   * Parse onProgress redefine arguments
   *
   * @method parseOnProgress
   * @param callback {Function} Function to be redefine
   */
  fileUploadifive.prototype.parseOnProgress = function(callback) {
    if (callback) {
      var original = callback;
      callback = function() {
        return original.call(this, arguments[0], arguments[1].loaded, arguments[1].total);
      };
    }
    return callback;
  };
  /**
   * Parse options for compatibility with uploadifive
   *
   * @method parseOptions
   * @param options {Object} Contains all the options
   */
  fileUploadifive.prototype.parseOptions = function(options) {
    $.extend(this.options, options);
    this.options.uploadScript = options.url;
    // parse on progress
    this.options.onProgress = this.parseOnProgress(options.onProgress);
    // parse onAddQueueItem
    this.options.onAddQueueItem = options.onAdd;

    return this.options;
  };
  /**
   * Initialize uploadifive library
   *
   * @method init
   * @param $input {Object} Input file type (always the input has to be type=file)
   * @param options {Object} Options that setup uploadifive
   */
  fileUploadifive.prototype.init = function($input, options) {
    if ($input) {
      this.$input = $input;
      this.$input.uploadifive(this.parseOptions(options));
    }
  };
  /**
   * Upload files
   *
   * @method upload
   * @param file {Object} File to be uploaded
   */
  fileUploadifive.prototype.upload = function(file) {
    var self = this;

    if (this.$input) {
      if (file) {
        this.$input.uploadifive('upload', file);
      } else {
        this.$input.uploadifive('upload');
      }
    }
  };
  /**
   * Cancel the selected file or if any arguments all the files.
   *
   * @method cancel
   * @param fileiD {Object} File to be canceled
   */
  fileUploadifive.prototype.cancel = function(file) {
    if (this.$input) {
      if (file) {
        this.$input.uploadifive('cancel', file);
      } else {
        this.$input.uploadifive('clearQueue');
      }
    }
  };
  /**
   * Set an option with some data during runtime
   *
   * @method settings
   * @param option {string} Option to be set.
   * @param data {Object} Data that will configure the option
   */
  fileUploadifive.prototype.settings = function(option, data) {
    this.$input.data('uploadifive').settings[option] = data;
  };
  /**
   * Get the data of a respective setting
   *
   * @method getSetting
   * @param option {string} Option to get.
   * @return Data
   */
  fileUploadifive.prototype.getSetting = function(option) {
    return this.$input.data('uploadifive').settings[option];
  };
  /**
   * Get the id of a file
   *
   * @method getId
   * @param file {Object} File.
   * @return id
   */
  fileUploadifive.prototype.getId = function(file) {
    return file.queueItem[0].id;
  };


  /**
   * Destroys the instance of Uploadifive and returns the file input to its original state.
   *
   * @method destroy
   */
  fileUploadifive.prototype.destroy = function() {
    this.$input.uploadifive('destroy');
  };

  return fileUploadifive;
});


/**
 * Proxy uploadify
 */
(function(root, callback) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('fileUtility/uploadify',
      function() {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return callback();
      });
  } else {
    /** Browser globals */
    return root.fileUploadify = callback();
  }

})(this, function() {
  /**
   * @class fileUploadify
   * @constructor
   */
  var fileUploadify = function() {
    this.options = {
      'swf': '/Vendors/Plugins/uploadify.swf',
      'uploader': '',
      'fileTypeExts': ''
    };
    this.events = {
      'onUploadSucces': '',
      'onUploadProgress': '',
      'onUploadError': '',
      'onSelectError': '',
      'onUploadStart': ''
    };
    this.$input = null;
    this.isHTML5 = false;

    return this;
  };
  /**
   * Parse file type extension
   *
   * @method parseFileType
   * @param arrtype {Array} An array with the mimetypes
   */
  fileUploadify.prototype.parseFileType = function(arrType) {
    var result = '';
    if (arrType) {
      $.each(arrType, function(index, value) {
        result += '*.' + value.split('/').pop() + ';';
      });
      // remove last ';'
      result = result.slice(0, -1);
    }
    return result;
  };
  /**
   * Parse onError redefine arguments
   *
   * @method parseOnError
   * @param callback {Function} Function to be redefine
   */
  fileUploadify.prototype.parseOnError = function(callback) {
    if (callback) {
      var original = callback;
      callback = function() {
        return original.call(this, arguments[2], arguments[0], arguments[1], arguments[3]);
      };
    }
    return callback;
  };
  /**
   * Parse onProgress redefine arguments
   *
   * @method parseOnProgress
   * @param callback {Function} Function to be redefine
   */
  fileUploadify.prototype.parseOnProgress = function(callback) {
    if (callback) {
      var original = callback;
      callback = function() {
        return original.apply(this, arguments);
      };
    }
    return callback;
  };
  /**
   * Parse options for compatibility with uploadify
   *
   * @method parseOptions
   * @param options {Object} Contains all the options
   */
  fileUploadify.prototype.parseOptions = function(options) {
    $.extend(this.options, options);
    this.options.uploader = options.url;
    // prevent to open a default (annoying) alert
    this.options.overrideEvents = ['onDialogClose'];

    this.options.fileTypeExts = this.parseFileType(options.fileType);
    // onUploadComplete never used in swf
    this.options.onUploadComplete = null;
    // parse onUploadSuccess
    this.options.onUploadSuccess = options.onUploadComplete;
    // parse errors events
    this.options.onUploadError = this.parseOnError(options.onError);
    this.options.onSelectError = this.parseOnError(options.onError);
    // parse onUploadProgress event
    this.options.onUploadProgress = this.parseOnProgress(options.onProgress);
    // parse onSelect
    this.options.onSelect = options.onAdd;
    // parse onUploadStart
    this.options.onUploadStart = options.onUploadFile;

    this.options.onFallback = function() {
      showMessage.show('You should install Flash for a complete experience');
    };

    return this.options;
  };

  /**
   * Initialize uploadifive library
   *
   * @method init
   * @param $input {Object} Input file type (always the input has to be type=file)
   * @param options {Object} Options that setup uploadify
   */
  fileUploadify.prototype.init = function($input, options) {
    if ($input) {
      this.$input = $input;
      // initialize uploadify library
      this.$input.uploadify(this.parseOptions(options));
    }
  };
  /**
   * Upload files
   *
   * @method upload
   * @param file {Object} File to be uploaded
   */
  fileUploadify.prototype.upload = function(file) {
    var self = this;

    if (this.$input) {
      if (file) {
        this.$input.uploadify('upload', file.id);
      } else {
        this.$input.uploadify('upload', '*');
      }
    }
  };
  /**
   * Cancel the selected file or all the files.
   *
   * @method cancel
   * @param fileiD {Object} File to be canceled
   */
  fileUploadify.prototype.cancel = function(fileiD) {
    if (this.$input) {
      if (fileiD) {
        this.$input.uploadify('cancel', fileiD);
      } else {
        // if no fileiD clear queue
        this.$input.uploadify('cancel', '*');
      }
    }
  };
  /**
   * Set an option with some data during runtime
   *
   * @method settings
   * @param option {string} Option to be set.
   * @param data {Object} Data that will configure the option
   */
  fileUploadify.prototype.settings = function(option, data) {
    this.$input.uploadify('settings', option, data);
  };
  /**
   * Get the data of a respective setting
   *
   * @method getSetting
   * @param option {string} Option to get.
   * @return Data
   */
  fileUploadify.prototype.getSetting = function(option) {
    return this.$input.uploadify('settings', option);
  };
  /**
   * Get the id of a file
   *
   * @method getId
   * @param file {Object} File.
   * @return id
   */
  fileUploadify.prototype.getId = function(file) {
    return file.id;
  };

  /**
   * Destroys the instance of Uploadify and returns the file input to its original state.
   *
   * @method destroy
   */
  fileUploadify.prototype.destroy = function() {
    this.$input.uploadify('destroy');
  };


  return fileUploadify;
});

/**
 * FileUtility wrapper
 */
(function(root, factory) {
  /** Setting up AMD support*/
  if (typeof define === 'function' && define.amd) {
    /** AMD */
    define('fileUtility/initializer', [
        'fileUtility/uploadifive',
        'fileUtility/uploadify'
      ],
      function(uploadifive, uploadify) {
        /** Export global even in AMD case in case this script
        is loaded with others */
        return factory(uploadifive, uploadify);
      });
  } else {
    /** Browser globals */
    return root.fileUtility = factory(fileUploadifive, fileUploadify);
  }

})(this, function(uploadifive, uploadify) {
  /**
   * @class fileUtility
   * @constructor
   */
  var fileUtility = function() {
    // Check if HTML5 is available
    if (window.File && window.FileList && window.Blob && (window.FileReader || window.FormData)) {
      this.uploader = new uploadifive();
    } else {
      this.uploader = new uploadify();
    }

    return this;
  };

  fileUtility.prototype = {
    contructor: fileUtility,
    /**
     * Initialize uploadifive library
     *
     * @method init
     * @param $input {Object} Input file type (always the input has to be type=file)
     * @param options {Object} Options that setup the corresponding library (uploadify or uplodifive)
     */
    init: function() {
      this.uploader.init.apply(this.uploader, arguments);
    },
    /**
     * Upload
     *
     * @method upload
     * @param file {Object} File to be uploaded
     */
    upload: function() {
      this.uploader.upload.apply(this.uploader, arguments);
    },
    /**
     * Cancel the selected file or all the files.
     *
     * @method cancel
     * @param fileiD {Object} File to be canceled
     */
    cancel: function() {
      this.uploader.cancel.apply(this.uploader, arguments);
    },
    /**
     * Set an option with some data during runtime
     *
     * @method settings
     * @param option {string} Option to be set.
     * @param data {Object} Data that will configure the option
     */
    settings: function() {
      this.uploader.settings.apply(this.uploader, arguments);
    },
    /**
     * Get the data of a respective setting
     *
     * @method getSetting
     * @param option {string} Option to get.
     * @return Data
     */
    getSetting: function() {
      return this.uploader.getSetting.apply(this.uploader, arguments);
    },
    /**
     * Get the id of a file
     *
     * @method getId
     * @param file {Object} File.
     * @return id
     */
    getId: function() {
      return this.uploader.getId.apply(this.uploader, arguments);
    },
    /**
     * Destroys the instance of FileUtility and returns the file input to its original state.
     *
     * @method destroy
     */
    destroy: function() {
      this.uploader.destroy.apply(this.uploader, arguments);
    }
  };

  return fileUtility;
});
