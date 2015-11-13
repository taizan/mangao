(function ($) {
    $.fn.rotate = function (angle) {
        if (angle == null) {
            return this.data("angle") || 0;
        } else {
            return this.data("angle", angle)
              .css("transform", "rotate(" + angle + "deg)");
        }
    };
})(jQuery);