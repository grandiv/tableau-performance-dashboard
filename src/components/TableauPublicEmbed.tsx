import React, { useEffect, useRef, useState } from "react";

interface TableauEmbedPublicProps {
  vizUrl: string;
}

const TableauPublicEmbed: React.FC<TableauEmbedPublicProps> = ({ vizUrl }) => {
  const vizRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) {
      const script = document.createElement("script");
      script.type = "module";
      script.src =
        "https://embedding.tableauusercontent.com/tableau.embedding.3.1.0.min.js";
      script.onload = () => {
        if (vizRef.current && !vizRef.current.querySelector("#tableauViz")) {
          const tableauViz = document.createElement("tableau-viz");
          tableauViz.setAttribute("id", "tableauViz");
          tableauViz.setAttribute("src", vizUrl);
          tableauViz.setAttribute("style", "width: 100%; height: 100%;");
          vizRef.current.appendChild(tableauViz);
        }
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isScriptLoaded, vizUrl]);

  return (
    <div
      ref={vizRef}
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }}
    />
  );
};

export default TableauPublicEmbed;
