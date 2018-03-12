var MyApi = (() => {
    var _api = {
        insertAtCursor: insertAtCursor
    };

    /*
     * 在光标处插入字符串
     * obj: 要插入的对象
     * val: 要插入的值
     */
    function insertAtCursor(obj, val)
    {
        // IE support
        if (document.selection)
        {
            obj.focus();
            sel = document.selection.createRange();
            sel.text = val;
            sel.select();
        }
        // Mozilla / Netscape support
        else if (obj.selectionStart || obj.selectionStart == '0')
        {
            var startPos    = obj.selectionStart,
                endPos      = obj.selectionEnd,
                topBefore  = obj.scrollTop;    // to restore scrollTop after insert
    
            obj.value   = obj.value.substring(0, startPos) +
                    val + 
                    obj.value.substring(endPos, obj.value.length);
    
            // restore scrollTop
            if (topBefore > 0) {
                obj.scrollTop = topBefore;
            }
    
            obj.focus();
    
            //adjust cursor position
            obj.selectionStart  = startPos + val.length;
            obj.selectionEnd    = startPos + val.length;
        }
        else
        {
            obj.value += val;
            obj.focus();
        }
    }

    return _api;
})();