const spaceRegExp = new RegExp(/\s/g);
const symbolRegExp = new RegExp(
  /[\{\}\[\]\/.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi
);

export function textToSlug(text: string): string {
  return text.replace(spaceRegExp, "-").replace(symbolRegExp, "");
}
