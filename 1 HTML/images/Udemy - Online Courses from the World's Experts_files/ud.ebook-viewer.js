(function($) {
    $.fn.ebookviewer = function(options) {
        var pdfView = null;
        var viewerIframe = null;
        var viewerType = null;
        var iframeSrc = null;
        var fileUrl = null;
        var VIEWER_TYPE_NATIVE = "native";
        var VIEWER_TYPE_MOZILLA_PDF_JS = "mozilla-pdf-js";
        var VIEWER_TYPE_DOWNLOAD = "download";
        var progressEvent = null;

        var detectViewer = function (ele) {
            var nativeViewerStatus = PluginDetect.isMinVersion('PDFReader', "0", fileUrl);
            if(nativeViewerStatus == 0){
                viewerType = VIEWER_TYPE_NATIVE;
            } else {
                viewerType = VIEWER_TYPE_MOZILLA_PDF_JS;
            }

            setViewerIframeSource(ele);
        };

        var setViewerIframeSource = function(ele){
            var url = iframeSrc+"&type="+viewerType+"&file="+fileUrl;
            ele.attr("src", url);
            if(progressEvent){
                setTimeout(setProgress.bind(this), 30000);
            }
        };

        var setProgress = function(){
            $.event.trigger(progressEvent, {'total': 1, 'position': 1});
        }

        iframeSrc = options.src;
        fileUrl = options.fileUrl;
        progressEvent = options.progressEvent;
        detectViewer(this);
    }
}(jQuery));