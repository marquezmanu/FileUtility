/**
 * Proxy uploadifive
 * @author Manuel Marquez
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
    this.$input = null;
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
      // Fix that add a default pointer
      this.$input.siblings().css('cursor', 'pointer');
    }
  };
  /**
   * Upload the last file selected
   *
   * @method upload
   */
  fileUploadifive.prototype.upload = function() {
    var self = this;
    if (this.$input) {
      // only upload the last file selected
      $.each($('.uploadifive-queue-item'), function(index, value) {
        var $value = $(value);
        if ($value.is(':last-child')) {
          return;
        }
        self.cancel($value.data('file'));
      });
      this.$input.uploadifive('upload');
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
      'swf': 'uploadify.swf',
      'uploader': '',
      'fileTypeExts': ''
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
    // onUploadComplete never used in swf, instead use onUploadSuccess
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
   * Upload the last file selected
   *
   * @method upload
   */
  fileUploadify.prototype.upload = function() {
    var self = this;
    if (this.$input) {
      // only upload the last file selected
      $.each($('.uploadify-queue-item'), function(index, value) {
        var $value = $(value);
        if ($value.is(':last-child')) {
          return;
        }
        self.cancel(value.id);
      });
      this.$input.uploadify('upload');
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
  }

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
  var fileUtility = function(flash) {
    // If user want the flash version set flash to true
    if (flash) {
      this.uploader = new uploadify()
    } else {
      // Check if HTML5 is available
      if (uploadifive && window.File && window.FileList && window.Blob && (window.FileReader || window.FormData)) {
        this.uploader = new uploadifive();
      } else {
        this.uploader = new uploadify()
      }
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
     * Upload the last file selected
     *
     * @method upload
     */
    upload: function() {
      this.uploader.upload.apply(this.uploader, arguments);
    },
    /**
     * Cancel the selected file or if none arguments all the files.
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
    }
  };

  return fileUtility;
});