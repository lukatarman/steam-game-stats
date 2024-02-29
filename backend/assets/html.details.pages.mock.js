import { parseHTML } from "linkedom";

export function createHtmlDetailsPages(pages) {
  return pages.map((page, index) => {
    return { page, id: index + 1 };
  });
}

export function getParsedHtmlPage(page) {
  return parseHTML(page).document;
}

export function getParsedHtmlPages(pages) {
  return pages.map((page) => parseHTML(page).document);
}
