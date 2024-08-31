import { Typography } from "@/components/primitives/typography";
import type { PostBodyData } from "@app/(modals)/create/post/step2/_features/store-post.schema";
import { Fragment } from "react";

export const PostParser = ({ data }: { data: PostBodyData | undefined }) => {
  if (!data) return null;
  return (
    <Fragment>
      {data.content.map((line, lineIndex) => {
        switch (line.type) {
          case "paragraph":
            return (
              <Typography key={lineIndex}>
                {line.content.map((element, elementIndex) => {
                  return (
                    <Fragment key={elementIndex}>
                      {element.marks ? (
                        element.marks?.map((mark, markIndex) => {
                          switch (mark.type) {
                            case "bold":
                              return (
                                <Typography
                                  key={markIndex}
                                  size="p"
                                  fontWeight="semibold"
                                >
                                  {element.text}
                                </Typography>
                              );
                            case "italic":
                              return (
                                <Typography
                                  key={markIndex}
                                  size="p"
                                  style={{ fontStyle: "italic" }}
                                >
                                  {element.text}
                                </Typography>
                              );
                            case "underline":
                              return (
                                <Typography
                                  key={markIndex}
                                  size="p"
                                  style={{
                                    textDecorationLine: "underline",
                                  }}
                                >
                                  {element.text}
                                </Typography>
                              );
                            // case "strike":
                            //   return (
                            //     <Typography
                            //       key={markIndex}
                            //       size="p"
                            //       decoration="line-through"
                            //     >
                            //       {element.text}
                            //     </Typography>
                            //   );
                            // case "code":
                            //   return (
                            //     <Typography key={markIndex} size="p" style="monospace">
                            //       {element.text}
                            //     </Typography>
                            //   );
                            // case "link":
                            //   return (
                            //     <Typography key={markIndex} size="p" href={mark.attrs.href}>
                            //       {element.text}
                            //     </Typography>
                            //   );
                            default:
                              return null;
                          }
                        })
                      ) : (
                        <Typography key={elementIndex} size="p">
                          {element.text}
                        </Typography>
                      )}
                    </Fragment>
                  );
                })}
              </Typography>
            );
          case "heading":
            return (
              <Typography key={lineIndex} size="h2">
                {line.content.map((element, elementIndex) => {
                  return <Fragment key={elementIndex}>{element.text}</Fragment>;
                })}
              </Typography>
            );
          default:
            return null;
        }
      })}
    </Fragment>
  );
};
