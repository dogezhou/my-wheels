imageInput.onchange = function (e) {
    let formData = new FormData()
    formData.append('touxiang', e.target.files[0])
    console.log('file', e.target.files[0])
    $.ajax({
        url: 'uploadurl',
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST'
    })
}