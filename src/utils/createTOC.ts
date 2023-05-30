export type TOC = { step: number; title: string }[];

export function createTOC(markdown: string): TOC {
  const toc: TOC = [];
  const titleList = markdown
    .split(`\n`)
    .filter((line) => line.trim()[0] === "#");
  let currentStep = 0;
  let currentHeading = 0;
  let currentRootHeading: number | null = null;

  for (const title of titleList) {
    const titleHeading = Array.from(title.trim().slice(0, 3)).findLastIndex(
      (char) => char === "#"
    );
    const titleContent = title.slice(titleHeading + 1).trim();
    const titleStep = (() => {
      if (currentHeading === titleHeading) {
        return currentStep;
      } else if (currentHeading < titleHeading) {
        return currentStep + 1;
      } else {
        return titleHeading === currentRootHeading ? titleHeading : currentStep;
      }
    })();

    toc.push({
      step: titleStep,
      title: titleContent,
    });
  }

  return toc;
}
