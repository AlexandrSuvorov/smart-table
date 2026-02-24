import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);
export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями

  Object.keys(indexes).forEach((elementName) => {
    const select = elements[elementName];

    if (select.options.length === 1) {
      select.append(
        ...Object.values(indexes[elementName]).map((name) => {
          return new Option(name, name);
        }),
      );
    }
  });
  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action) {
      const input = document.querySelector(
        'input[name="' + action.dataset.field + '"]',
      );
      input.value = "";
      state[action.dataset.field] = "";
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
