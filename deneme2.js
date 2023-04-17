const fileInput = document.getElementById('picker1');
fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];
  console.log(selectedFile);
  var reader = new FileReader();
  reader.readAsText(selectedFile);
}