"use client";
import { globalStore } from "@/store/global";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSpecificity } from "@/hooks/use-specificity";

const Preview = () => {
    const html = globalStore((state) => state.html);
    const css = globalStore((state) => state.css);
    const js = globalStore((state) => state.js);

    const {clickedElement, setClickedElement, iframeRef} = useSpecificity(html, css, js);

  const specificityExplanation = globalStore(
    (state) => state.specificityExplanation
  );

  return (
    <div className="w-full h-full">
      <iframe
        ref={iframeRef}
        style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
        title="Preview"
      >
        <Dialog open={clickedElement !== null} onOpenChange={() => setClickedElement(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Specificity</DialogTitle>
              <DialogDescription>
              <pre>{specificityExplanation !== '' ? specificityExplanation : 'No styles applied'}</pre>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </iframe>
    </div>
  );
};

export default Preview;
