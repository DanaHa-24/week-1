
async function uploadFiles() {
    var fileInput = document.getElementById("upload");
    var filePath = fileInput.value;
    var fileUploaded = 0;
    var totalSize =0;
    let inUsed = 100;
    let leftToUse = 900;
    var size = 0;
    let usage = document.getElementById("progress-completed");
    // Allowing file type
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    
    for(let fileIndex=0;fileIndex<upload.files.length;fileIndex++) {
        const file = upload.files[fileIndex];
        if (size < 1000000){
            size = (upload.files[fileIndex].size * 0.001).toFixed(2);
        }
        else{
            size = (upload.files[fileIndex].size).toFixed(2);
        }
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        
        if (!allowedExtensions.exec(filePath)) {
            alert('File format isn’t supported \nNote: Allowed image formats: .jpg, .jpeg, .gif, .png');
            fileInput.value = '';
            return false;
        }
        if (totalSize > leftToUse){
            alert('Error: There is not enough space on the disk');
            return false;
        }
        let formData = new FormData();
        formData.append('file', upload.files[fileIndex])
        fetch('https://httpbin.org/post', {
            method: "POST",
            body: formData,
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        alert('The file has been uploaded successfully');
        totalSize += size;
        fileUploaded += 1;
    }
    //Change text in html page
    leftToUse -= totalSize;
    inUsed = 1000 - leftToUse;
    document.getElementById("inUsed").innerText = inUsed;
    document.getElementById("remaining-capacity-number").innerText = leftToUse;
    
    //Change percentage of progress bar
    var percent = ((inUsed/1000) * 100);
    usage.style.width = percent.toString(10) + "%";
    usage.style.transition = "width 0.5s ease 0.1s";
    
    
    return true;
}