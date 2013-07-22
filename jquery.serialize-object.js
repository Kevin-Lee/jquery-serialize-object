(function($) {
  var mainConfig = {
    "defaultValue":null,
    "defaultValues":{},
    "numberForNumber":true,
    "noNumbers":[]
  }
  $.serializeObjectSetup = function(config) {
    return $.extend(true, mainConfig, config);
  };

  function getDefaultValue(key, defaultIfNotFound, defaultValues) {
    if ($.isArray(defaultValues))
    {
      for (var i = 0; i < defaultValues.length; i++)
      {
        var defaultNameValuePair = defaultValues[i];
        if (-1 !== $.inArray(key, defaultNameValuePair.names))
        {
          return defaultNameValuePair.defaultValue;
        }
      }
    }
    else
    {
      var defaultValueFound = defaultValues[key];
      return defaultValueFound ? defaultValueFound : defaultIfNotFound;
    }
    return defaultIfNotFound;
  };

  return $.fn.serializeObject = function(config) {
    config = config ? $.extend(true, {}, mainConfig, config) : mainConfig;

    var json, patterns, push_counters,
      _this = this;
    json = {};
    push_counters = {};
    patterns = {
      validate: /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
      key: /[a-zA-Z0-9_]+|(?=\[\])/g,
      push: /^$/,
      fixed: /^\d+$/,
      named: /^[a-zA-Z0-9_]+$/
    };
    this.build = function(base, key, value) {
      base[key] = value;
      return base;
    };
    this.push_counter = function(key) {
      if (push_counters[key] === void 0) {
        push_counters[key] = 0;
      }
      return push_counters[key]++;
    };

    $.each($(this).serializeArray(), function(i, elem) {
      var k, keys, merge, re, reverse_key;
      if (!patterns.validate.test(elem.name)) {
        return;
      }
      keys = elem.name.match(patterns.key);
      
      reverse_key = elem.name;
      var value = elem.value;
      var defaultValue = getDefaultValue(reverse_key, config.defaultValue, config.defaultValues);

      merge =
        (config.numberForNumber &&
         0 > $.inArray(reverse_key, config.noNumbers) ?
            (isNaN(value) ?
              elem.value :
              Number(value)) :
            value) ||
        defaultValue;
      
      while ((k = keys.pop()) !== void 0) {
        if (patterns.push.test(k)) {
          re = new RegExp("\\[" + k + "\\]$");
          reverse_key = reverse_key.replace(re, '');
          merge = _this.build([], _this.push_counter(reverse_key), merge);
        } else if (patterns.fixed.test(k)) {
          merge = _this.build([], k, merge);
        } else if (patterns.named.test(k)) {
          merge = _this.build({}, k, merge);
        }
      }
      return json = $.extend(true, json, merge);
    });
    return json;
  };
})(jQuery);
