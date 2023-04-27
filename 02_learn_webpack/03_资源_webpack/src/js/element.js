import '../css/style.css';
import '../css/title.less';
import '../css/img.css';

// 将图片以模块的方式加载进来，否则不能被webpack打包
import img22 from '../img/22.jpg';

const divEl = document.createElement('div');
divEl.className = 'title';
divEl.innerHTML = '你好，世界！！！';

const bgDivEl = document.createElement('div');
bgDivEl.className = 'bg-image';

const imgEl = document.createElement('img');
// 这样写是将一个字符串路径赋值给img的src属性，webpack打包的时候只会打包引用的模块，因此这张图片不会被打包进去
// imgEl.src = './img/22.jpg';
imgEl.src = img22;

document.body.appendChild(divEl);
document.body.appendChild(bgDivEl);
document.body.appendChild(imgEl);