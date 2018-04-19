/**
 * Created by 18826 on 2018/4/8.
 */
export function urlParse (){
  let search = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g;
  let arr = search.match(reg);
  if (arr){
    arr.forEach((item) =>{
      let tempArr = item.substr(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
}
