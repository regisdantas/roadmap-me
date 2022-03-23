import React from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkEmoji from "remark-emoji";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkToc from "remark-toc";
import remarkBreaks from "remark-breaks";
import stringWidth from "string-width";
// import remarkMdx from "remark-mdx";
// import remarkPrism from "remark-prism";

import "katex/dist/katex.min.css";
import "./ContentView.css";

import { Done, Edit, Save } from "@mui/icons-material";

function ContentView({
  contentViewCtrl,
  contentViewCallbacks,
  toggleContentView,
}) {
  const [contentView, setContentView] = React.useState({
    title: contentViewCtrl.title,
    content: contentViewCtrl.content,
    isEditing: false,
  });

  React.useEffect(() => {
    if (contentViewCtrl.state) {
      setContentView({
        ...contentView,
        title: contentViewCtrl.title,
        content: contentViewCtrl.content,
      });
    }
  }, [contentViewCtrl.state]);

  function ImageRenderer(props) {
    return <img {...props} style={{ maxWidth: "100%" }} />;
  }

  return (
    <div>
      <Drawer
        anchor="right"
        open={contentViewCtrl.state}
        onClose={() => {
          setContentView({
            title: "",
            content: "",
            isEditing: false,
          });
          toggleContentView(false);
        }}
      >
        <Box sx={{ width: "50vw" }} role="presentation">
          <div
            className="contentView"
            style={{ margin: "20px 20px 20px", padding: "0px 20px 0px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                margin: "0px 0px 30px",
              }}
            >
              <Button
                size="small"
                sx={{ height: "24px", fontSize: "12px" }}
                variant="contained"
                color={contentViewCtrl.checked ? "error" : "success"}
                startIcon={<Done sx={{ padding: "0px 0px 3px" }} />}
                onClick={() => contentViewCallbacks.onCheckToggle()}
              >
                {contentViewCtrl.checked ? "Mark as Pending" : "Mark as Done"}
              </Button>
              <Button
                size="small"
                sx={{
                  height: "24px",
                  fontSize: "12px",
                  color: "black",
                  backgroundColor: "gold",
                }}
                variant="contained"
                startIcon={<Edit sx={{ padding: "0px 0px 3px" }} />}
                onClick={() => {
                  if (!contentView.isEditing) {
                    setContentView({
                      ...contentView,
                      isEditing: true,
                    });
                  }
                }}
              >
                Edit
              </Button>
            </div>
            <h1>{contentView.title}</h1>
            <div style={{ padding: "0 4px 0" }}>
              {
                <ReactMarkdown
                  children={contentView.content}
                  remarkPlugins={[
                    [
                      remarkEmoji,
                      {
                        padSpaceAfter: false,
                        emoticon: true,
                      },
                    ],
                    [remarkToc, { tight: true, ordered: true }],
                    [remarkGfm, { stringLength: stringWidth }],
                    remarkMath,
                    rehypeKatex,
                    remarkBreaks,
                    // remarkGridTables,
                    // remarkPrism,
                    remarkFrontmatter,
                    // remarkMdx
                  ]}
                  className={"reactMarkDown"}
                  style={{ width: "50vw" }}
                />
              }
            </div>
          </div>
        </Box>
      </Drawer>
      <Drawer
        anchor="left"
        BackdropProps={{ style: { opacity: 0 } }}
        open={contentView.isEditing}
        onClose={() => {
          setContentView({
            ...contentView,
            isEditing: false,
          });
        }}
      >
        <Box sx={{ width: "50vw", height: "100%" }} role="presentation">
          <div
            className="contentView"
            style={{ margin: "20px 20px 20px", padding: "0px 20px 0px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                margin: "0px 0px 30px",
              }}
            >
              <Button
                size="small"
                color="success"
                sx={{
                  height: "24px",
                  fontSize: "12px",
                }}
                variant="contained"
                startIcon={<Save sx={{ padding: "0px 0px 3px" }} />}
                onClick={() => {
                  contentViewCallbacks.onSave(
                    contentView.title,
                    contentView.content
                  );
                  setContentView({
                    ...contentView,
                    isEditing: false,
                  });
                }}
              >
                Save
              </Button>
            </div>
            <h1
              contentEditable="true"
              onBlur={(e) => {
                setContentView({
                  ...contentView,
                  title: e.currentTarget.innerText,
                });
              }}
            >
              {contentView.title}
            </h1>
            <div style={{ padding: "0 4px 0" }}>
              <textarea
                style={{
                  width: "100%",
                  height: `${useWindowDimensions().height - 150}px`,
                  boxSizing: "border-box",
                  resize: "none",
                  fontSize: "16px",
                  padding: "0px 10px 0px",
                }}
                value={contentView.content}
                onChange={(e) =>
                  setContentView({
                    ...contentView,
                    content: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

ContentView.propTypes = {};

export default ContentView;
