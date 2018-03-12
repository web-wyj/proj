(() => {
    const mdConverter = new showdown.Converter();

    var mdEdit = document.getElementById('md-edit');
    var preview = document.getElementById('md-preview');
    var buttonsContainer = document.querySelector('.input-buttons');

    mdEdit.addEventListener('keyup', () => {
        renderPreview();
    });

    function renderPreview(){
        const result = convertMarkdownHTML(mdEdit.value);
        preview.innerHTML = result;
    }

    function convertMarkdownHTML(markdownStr){
        return mdConverter.makeHtml(markdownStr);
    }

    function showInputButtons(){
        buttonsContainer.style.display = 'block';
        mdEdit.style.height = `calc(100% - ${buttonsContainer.clientHeight}px)`;
        buttonsContainer.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() == 'button') {
                mdEdit.focus();
                MyApi.insertAtCursor(mdEdit, '插入');
            }
        },false);
    }

    showInputButtons();
})();