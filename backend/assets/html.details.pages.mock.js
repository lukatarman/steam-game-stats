export function createHtmlDetailsPages(pages) {
  return pages.map((page, index) => {
    return { page, id: index + 1 };
  });
}
