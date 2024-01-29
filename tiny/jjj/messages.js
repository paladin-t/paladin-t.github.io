const msgBtn = document.getElementById('message-button');
const msgDlg = document.getElementById('message-dialog');
const closeBtn = document.getElementById('message-close-button');
msgBtn.addEventListener('click', () => {
  msgBtn.style.display = 'none';
  msgDlg.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
  msgBtn.style.display = 'block';
  msgDlg.style.display = 'none';
});
