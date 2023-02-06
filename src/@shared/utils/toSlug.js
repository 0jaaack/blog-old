const spaceRegExp = new RegExp(/\s/g);
const symbolsRegExp = new RegExp(/[\{\}\[\]\/.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi);

function toSlug(text) {
  return text
    .replace(spaceRegExp, "-")
    .replace(symbolsRegExp, "");
}

export default toSlug;
