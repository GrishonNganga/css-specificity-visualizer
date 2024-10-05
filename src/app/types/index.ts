export interface Specificity {
  id: number;
  class: number;
  tag: number;
  specificityScore: number;
}

export interface CSSRule {
  selectorText: string;
  specificityScore: number;
  style: CSSStyleDeclaration;
  inline?: boolean;
}
