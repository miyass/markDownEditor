const initState = {
  contents: [
    {id: '1', title: 'sample', content: '# title \n# 1'},
  ],
  selectContent: {
    id: '', title: '', content: ''
  },
}

const contentReducer = (state = initState, action) => {
  //今タイプしてるcontentのidは取れるけど不安定かも...
  let currentId = state.selectContent.id;
  let currentContents = state.contents;
  switch (action.type) {
    case 'VIEW_CONTENT':
      return Object.assign({}, state, {
        selectContent: action.selectContent,
      });
    case 'ADD_CONTENT':
      currentContents = currentContents.slice(0)
      let emptyNewContent = {id: (currentContents.length + 1).toString(), title: '', content: ''}
      currentContents.push(emptyNewContent);
      return Object.assign({}, state, {
        contents: currentContents,
        selectContent: emptyNewContent
      });
    case 'DELETE_CONTENT':
      //Deleteの現状のバグ：contentsが0になった時、selectしてるやつを削除した時
      const newContent = currentContents.filter((content) => {
        return !(action.contentId === content.id);
      });
      return Object.assign({}, state, {
        contents: newContent,
      });
    case 'CHANGE_TITLE':
      //タイトル変更時のみsidebarを再レンダリングしたいので、sliceメソッド適用
      currentContents = currentContents.slice(0)
      currentContents[currentId - 1].title = action.title;
      return Object.assign({}, state, {
        contents: currentContents
      });
    case 'CHANGE_CONTENT':
      currentContents[currentId - 1].content = action.content
      return Object.assign({}, state, {
        contents: currentContents
      });
    default:
      return state
  }
}

export default contentReducer
