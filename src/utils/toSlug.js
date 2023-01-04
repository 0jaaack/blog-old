const spaceRegExp = new RegExp(/\s/g);
const symbolsRegExp = new RegExp(/[\{\}\[\]\/.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi);

function toSlug(text) {
  return text
    .replaceAll(spaceRegExp, "-")
    .replaceAll(symbolsRegExp, "");
}

export default toSlug;
