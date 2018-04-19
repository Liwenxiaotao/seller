/**
 * Created by 18826 on 2018/4/4.
 */
export function format(date,fmt){
  date = new Date(date);
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));
  }
  let obj={
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in obj){
    if(new RegExp(`(${k})`).test(fmt)){
      fmt = fmt.replace(RegExp.$1,RegExp.$1.length === 1?obj[k]:padLeftZero(obj[k]+''));
    }
  }
  return fmt;
}


function padLeftZero(str){
  return ('00'+str).substr(str.length);
}
