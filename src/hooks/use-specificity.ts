import { globalStore } from "@/store/global";
import { useCallback, useEffect, useRef, useState } from "react";
import { Specificity, CSSRule, ComputedStyle } from "@/app/types";
export const useSpecificity = (html: string, css: string, js: string) => {
  const updateSpecificityExplanation = globalStore(
    (state) => state.updateSpecificityExplanation
  );

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [clickedElement, setClickedElement] = useState<HTMLElement | null>(
    null
  );

  const calculateSpecificity = useCallback((selector: string): Specificity => {
    let idCount = 0,
      classCount = 0,
      tagCount = 0;

    const idRegex = /#[\w-]+/g;
    const classRegex = /\.[\w-]+/g;
    const tagRegex = /^[a-zA-Z]+|\s[a-zA-Z]+/g;

    const idMatches = selector.match(idRegex);
    if (idMatches) idCount += idMatches.length;

    const classMatches = selector.match(classRegex);
    if (classMatches) classCount += classMatches.length;

    const tagMatches = selector.match(tagRegex);
    if (tagMatches) tagCount += tagMatches.length;

    return {
      id: idCount,
      class: classCount,
      tag: tagCount,
      specificityScore: idCount * 100 + classCount * 10 + tagCount,
    };
  }, []);

  const explainSpecificity = useCallback(
    (rules: CSSRule[]): string => {
      const explanations: string[] = [];
      const computedStyles: { [key: string]: ComputedStyle } = {};

      rules.forEach((rule) => {
        const selector = rule.inline ? "inline style" : rule.selectorText;
        const specificity = rule.inline
          ? { specificityScore: 1000 }
          : calculateSpecificity(selector);
        const properties = rule.style;

        for (let i = 0; i < properties.length; i++) {
          const property = properties[i];
          const value = properties.getPropertyValue(property);
          const important =
            properties.getPropertyPriority(property) === "important";

          const effectiveSpecificity = important
            ? 10000 + specificity.specificityScore
            : specificity.specificityScore;

          if (
            !computedStyles[property] ||
            (computedStyles[property].important === false && important) ||
            effectiveSpecificity >
              computedStyles[property].specificity.specificityScore
          ) {
            computedStyles[property] = {
              value,
              specificity: { specificityScore: effectiveSpecificity },
              important,
              rule: selector,
            };
          }
        }
      });

      Object.keys(computedStyles).forEach((property) => {
        const style = computedStyles[property];
        explanations.push(
          `${property}: ${style.value} (from ${style.rule} with specificity: ${style.specificity.specificityScore})`
        );
      });

      return explanations.join("\n");
    },
    [calculateSpecificity]
  );

  const getInlineStyles = useCallback(
    (element: HTMLElement): CSSRule | null => {
      if (element.hasAttribute("style")) {
        const styles = element.style;
        return {
          selectorText: "inline",
          specificityScore: 1000,
          style: styles,
          inline: true,
        };
      }
      return null;
    },
    []
  );

  const getAllMatchingRules = useCallback(
    (element: HTMLElement, iframeDoc: Document): CSSRule[] => {
      const matchingRules: CSSRule[] = [];
      const cssRules = iframeDoc.styleSheets;

      for (let i = 0; i < cssRules.length; i++) {
        try {
          const rules =
            (cssRules[i] as CSSStyleSheet).cssRules ||
            (cssRules[i] as CSSStyleSheet).rules;
          if (rules) {
            for (const rule of Array.from(rules)) {
              const cssRule = rule as CSSStyleRule;
              if (element.matches(cssRule.selectorText)) {
                matchingRules.push({
                  selectorText: cssRule.selectorText,
                  specificityScore: calculateSpecificity(cssRule.selectorText)
                    .specificityScore,
                  style: cssRule.style,
                });
              }
            }
          }
        } catch (err) {
          console.warn("Error reading stylesheet:", err);
        }
      }

      return matchingRules;
    },
    [calculateSpecificity]
  );

  useEffect(() => {
    const handleIframeClick = (e: MouseEvent) => {
      e.preventDefault();
      const element = e.target as HTMLElement;
      const iframeDoc = iframeRef.current?.contentDocument;

      if (!iframeDoc) return;

      const rules = getAllMatchingRules(element, iframeDoc);

      const inlineStyles = getInlineStyles(element);
      if (inlineStyles) {
        rules.push(inlineStyles);
      }

      const explanation = explainSpecificity(rules);
      updateSpecificityExplanation(explanation);
      console.log(element);
      setClickedElement(element);
    };

    const iframe = iframeRef.current;
    const iframeDoc =
      iframe?.contentDocument || iframe?.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
            <style>${css}</style>
            ${html}
            <script>
              (function() {
                ${js}
              })();
            <\/script>
          `);
      iframeDoc.close();

      iframeDoc.removeEventListener("click", handleIframeClick);
      iframeDoc.addEventListener("click", handleIframeClick as EventListener);
    }
  }, [
    html,
    css,
    js,
    explainSpecificity,
    getAllMatchingRules,
    getInlineStyles,
    updateSpecificityExplanation,
  ]);
  return { clickedElement, setClickedElement, iframeRef };
};
