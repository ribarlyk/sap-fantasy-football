import React from "react";

function ScorebatEmbed() {
    return (
        <iframe
            src="https://www.scorebat.com/embed/"
            frameBorder="0"
            width="600"
            height="760"
            allowFullScreen
            allow="autoplay; fullscreen"
            style={{
                width: "100%",
                height: "760px",
                overflow: "hidden",
                display: "block",
            }}
            className="_scorebatEmbeddedPlayer_"
        />
    );
}

export default ScorebatEmbed;
