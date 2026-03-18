// TODO: TIL 폼 등록 기능을 구현하세요
// 1. 폼 요소와 목록 요소를 querySelector로 선택합니다.
// 2. 폼의 submit 이벤트를 감지하여 새 TIL 항목을 목록에 추가합니다.

const tilForm = document.querySelector('#til-form');
const tilList = document.querySelector('#til-list');

tilForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // TODO: 입력값을 가져와서 새 TIL 항목을 만들어 목록에 추가하세요
  const inputDate = document.getElementById('til-date').value;
  const inputTitle = document.getElementById('til-title').value;
  const inputContent = document.getElementById('til-content').value;

  const listRow = document.createElement('article');
  listRow.className = 'til-item';
  listRow.insertAdjacentHTML(
    'afterbegin',
    `<time>${inputDate}</time><h3>${inputTitle}</h3><p>${inputContent}</p>`,
  );

  tilList.appendChild(listRow);
});
