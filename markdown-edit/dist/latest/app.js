'use strict';

var MyApi = function () {
    var _api = {
        insertAtCursor: insertAtCursor
    };

    /*
     * 在光标处插入字符串
     * obj: 要插入的对象
     * val: 要插入的值
     */
    function insertAtCursor(obj, val) {
        // IE support
        if (document.selection) {
            obj.focus();
            sel = document.selection.createRange();
            sel.text = val;
            sel.select();
        }
        // Mozilla / Netscape support
        else if (obj.selectionStart || obj.selectionStart == '0') {
                var startPos = obj.selectionStart,
                    endPos = obj.selectionEnd,
                    topBefore = obj.scrollTop; // to restore scrollTop after insert

                obj.value = obj.value.substring(0, startPos) + val + obj.value.substring(endPos, obj.value.length);

                // restore scrollTop
                if (topBefore > 0) {
                    obj.scrollTop = topBefore;
                }

                obj.focus();

                //adjust cursor position
                obj.selectionStart = startPos + val.length;
                obj.selectionEnd = startPos + val.length;
            } else {
                obj.value += val;
                obj.focus();
            }
    }

    return _api;
}();
"use strict";

// 在光标处插入字符串
// myField 文本框对象
// myValue 要插入的值
function insertAtCursor(myField, myValue) {
    console.log(myField.selectionStart);
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            // save scrollTop before insert
            var restoreTop = myField.scrollTop;
            myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
            if (restoreTop > 0) {
                // restore previous scrollTop
                myField.scrollTop = restoreTop;
            }
            myField.focus();
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
        } else {
            myField.value += myValue;
            myField.focus();
        }
}

function insertText() {
    var obj = document.getElementById("文本框");
    var str = "[#$%$#]插入的内容";
    if (document.selection) {
        obj.focus();
        var sel = document.selection.createRange();
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart;
        var endPos = obj.selectionEnd;
        var tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
    } else {
        obj.value += str;
    }
}
'use strict';

(function () {
    var mdConverter = new showdown.Converter();

    var mdEdit = document.getElementById('md-edit');
    var preview = document.getElementById('md-preview');
    var buttonsContainer = document.querySelector('.input-buttons');

    mdEdit.addEventListener('keyup', function () {
        renderPreview();
    });

    function renderPreview() {
        var result = convertMarkdownHTML(mdEdit.value);
        preview.innerHTML = result;
    }

    function convertMarkdownHTML(markdownStr) {
        return mdConverter.makeHtml(markdownStr);
    }

    function showInputButtons() {
        buttonsContainer.style.display = 'block';
        mdEdit.style.height = 'calc(100% - ' + buttonsContainer.clientHeight + 'px)';
        buttonsContainer.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() == 'button') {
                mdEdit.focus();
                MyApi.insertAtCursor(mdEdit, '插入');
            }
        }, false);
    }

    showInputButtons();
})();