// 异步获取当前目录下的所有tsx文件
const files = import.meta.globEager('./*.tsx');

const components: any = {};

Object.keys(files).forEach((key) => {
  const name = key.replace(/(\.\/|\.tsx)/g, '');
  components[name] = files[key].default;
});
export default components;
